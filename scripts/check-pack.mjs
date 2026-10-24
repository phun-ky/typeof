// Check what npm would publish: pack the package, check the tarball holds the
// files package.json points at, its LICENSE, README and CHANGELOG, and no
// tests, lint it with publint and @arethetypeswrong/cli, then install it in an
// empty project, check every source map resolves and that the builds bundle no
// dependencies, and call the helpers through import, require, the old dist
// path and a browser bundle. Run after `npm run build`.
//
// With CHECK_PACK_NODE set to another Node binary, the import, require and
// dist path calls also run on it, and its version must be the engines minimum,
// so the oldest Node the package allows is tested.
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';

import { execFileSync } from 'node:child_process';
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const BIN = join(ROOT, 'node_modules', '.bin');
// Bare specifiers in import, export from, import() and require()
const IMPORT =
  /(?:\bfrom\s*|\bimport\s*\(?\s*|\brequire\s*\(\s*)["']([^"'.][^"']*)["']/g;
const FLOOR_NODE = process.env.CHECK_PACK_NODE;
/** Run a linter; return its output if it fails. */
const lint = (command, args) => {
  try {
    execFileSync(join(BIN, command), args, {
      cwd: ROOT,
      encoding: 'utf8',
      stdio: 'pipe'
    });

    return undefined;
  } catch (error) {
    return `${error.stdout ?? ''}${error.stderr ?? ''}`.trim();
  }
};
/** Every .map file under dir. */
const mapsIn = (dir) =>
  readdirSync(dir, { recursive: true })
    .filter((file) => file.endsWith('.map'))
    .map((file) => join(dir, file));
const npm = (args, cwd) =>
  execFileSync('npm', args, {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'inherit']
  });
/** Every file path a package.json points at, without the leading ./ */
const entryPoints = (pkg) => {
  const paths = [];
  const collect = (value) => {
    if (typeof value === 'string') paths.push(value);
    else if (value && typeof value === 'object')
      Object.values(value).forEach(collect);
  };

  collect(pkg.exports);
  collect(pkg.main);
  collect(pkg.module);
  collect(pkg.types);

  // Subpath patterns such as ./dist/* are not files
  return paths
    .filter((path) => !path.includes('*'))
    .map((path) => path.replace(/^\.\//, ''));
};
const pkg = JSON.parse(readFileSync(join(ROOT, 'package.json'), 'utf8'));
const work = mkdtempSync(join(tmpdir(), 'typeof-pack-'));
const problems = [];

try {
  const output = JSON.parse(
    npm(['pack', '--json', '--pack-destination', work], ROOT)
  );
  // An array in npm 11, an object keyed by package name in npm 12
  const packed = Array.isArray(output) ? output[0] : Object.values(output)[0];
  const files = new Set(packed.files.map((file) => file.path));

  // npm adds LICENSE and README.md on its own, if the package has them
  for (const path of [
    ...entryPoints(pkg),
    'LICENSE',
    'README.md',
    'CHANGELOG.md'
  ]) {
    if (!files.has(path)) problems.push(`${path} is not in the tarball`);
  }

  for (const path of files) {
    if (/(^|\/)__tests__\/|\.tsbuildinfo$/.test(path)) {
      problems.push(`${path} should not be published`);
    }
  }

  const tarball = join(work, packed.filename);
  const types = lint('attw', [tarball]);
  const publint = lint('publint', ['--strict', tarball]);

  if (types) problems.push(`@arethetypeswrong/cli:\n${types}`);

  if (publint) problems.push(`publint:\n${publint}`);

  console.log(
    `${pkg.name}@${pkg.version}: ${files.size} files, ${packed.size} bytes`
  );

  if (problems.length === 0) {
    const app = join(work, 'app');
    const installed = join(app, 'node_modules', pkg.name);

    mkdirSync(app);
    writeFileSync(
      join(app, 'package.json'),
      '{ "name": "app", "private": true }\n'
    );
    npm(
      [
        'install',
        '--no-audit',
        '--no-fund',
        '--ignore-scripts',
        '--offline',
        tarball
      ],
      app
    );

    // Runtime dependencies are declared, never bundled: the ES module and
    // CommonJS builds may not contain code from node_modules, and every
    // package they import must be a dependency
    const declared = new Set([
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.peerDependencies ?? {})
    ]);
    const moduleBuilds = new Set(
      [
        pkg.exports?.['.']?.import?.default,
        pkg.exports?.['.']?.require?.default,
        pkg.main,
        pkg.module
      ]
        .filter(Boolean)
        .map((path) => path.replace(/^\.\//, ''))
    );

    for (const file of moduleBuilds) {
      const code = readFileSync(join(installed, file), 'utf8');
      const map = `${join(installed, file)}.map`;
      const inlined = existsSync(map)
        ? JSON.parse(readFileSync(map, 'utf8')).sources.filter((source) =>
            source.includes('node_modules/')
          )
        : [];
      const imported = [...code.matchAll(IMPORT)]
        .map(([, specifier]) => specifier)
        .filter((specifier) => !specifier.startsWith('node:'))
        .map((specifier) =>
          specifier
            .split('/')
            .slice(0, specifier.startsWith('@') ? 2 : 1)
            .join('/')
        );

      for (const source of inlined) {
        problems.push(
          `${file} inlines ${source}; declare it in dependencies and keep it external`
        );
      }

      for (const dependency of new Set(imported)) {
        if (!declared.has(dependency))
          problems.push(
            `${file} imports ${dependency}, which isn't in dependencies`
          );
      }
    }

    // Our own sources must be published next to the maps; bundled
    // dependencies are not installed, so their source must be embedded
    for (const map of mapsIn(installed)) {
      const { sources, sourcesContent = [] } = JSON.parse(
        readFileSync(map, 'utf8')
      );

      sources.forEach((source, index) => {
        const resolves = source.includes('node_modules/')
          ? typeof sourcesContent[index] === 'string'
          : existsSync(join(dirname(map), source));

        if (!resolves) {
          problems.push(
            `${relative(installed, map)} points at ${source}, which isn't published`
          );
        }
      });
    }

    const expect = `
      const check = (how, m) => {
        for (const name of ['isString', 'isNumber', 'isNotNumber', 'isUndefined']) {
          if (typeof m?.[name] !== 'function') throw new Error(how + ': ' + name + ' is ' + typeof m?.[name]);
        }
        const ok = m.isString('a') && m.isNumber(1) && m.isNotNumber('1') && m.isUndefined(undefined);
        if (!ok) throw new Error(how + ': the helpers gave wrong answers');
        console.log(how + ': isString, isNumber, isNotNumber, isUndefined work');
      };
    `;
    const name = JSON.stringify(pkg.name);
    const smokes = {
      'ES module import': [
        '--input-type=module',
        '-e',
        `${expect} check('import', await import(${name}));`
      ],
      'CommonJS require': [
        '--input-type=commonjs',
        '-e',
        `${expect} check('require', require(${name}));`
      ],
      // Deep imports worked before exports existed, and must keep working
      'dist path import': [
        '--input-type=module',
        '-e',
        `${expect} check('dist path', await import(${JSON.stringify(`${pkg.name}/dist/typeof.js`)}));`
      ]
    };
    const runtimes = ['node'];

    if (FLOOR_NODE) {
      // The floor run is only meaningful on exactly the engines minimum
      const floor = pkg.engines?.node?.match(/^>=\s*(\d+\.\d+\.\d+)$/)?.[1];
      const version = execFileSync(FLOOR_NODE, ['--version'], {
        encoding: 'utf8'
      }).trim();

      if (version === `v${floor}`) runtimes.push(FLOOR_NODE);
      else
        problems.push(
          `CHECK_PACK_NODE is Node ${version}, but engines.node is ${pkg.engines?.node}`
        );
    }

    for (const runtime of runtimes) {
      const version = execFileSync(runtime, ['--version'], {
        encoding: 'utf8'
      }).trim();

      console.log(`Node ${version}:`);

      for (const [how, args] of Object.entries(smokes)) {
        try {
          execFileSync(runtime, args, { cwd: app, stdio: 'inherit' });
        } catch {
          problems.push(
            `${how} of the installed tarball failed on Node ${version}`
          );
        }
      }
    }

    // A browser bundler resolving the package from the app
    try {
      const entry = join(app, 'entry.js');

      writeFileSync(
        entry,
        `import { isNumber, isString } from ${name};\nglobalThis.result = isString('a') && isNumber(1);\n`
      );

      const bundle = await rollup({
        input: entry,
        plugins: [nodeResolve({ browser: true, rootDir: app })]
      });
      const { output } = await bundle.generate({ format: 'iife' });
      const sandbox = {};

      await bundle.close();
      runInNewContext(output[0].code, sandbox);

      if (sandbox.result !== true)
        throw new Error(`the helpers gave ${sandbox.result}`);

      console.log('browser bundle: isString and isNumber work');
    } catch (error) {
      problems.push(
        `a browser bundle of the installed tarball failed: ${error}`
      );
    }
  }
} finally {
  rmSync(work, { recursive: true, force: true });
}

if (problems.length > 0) {
  console.error('\nThe package would not publish correctly:\n');
  for (const problem of problems) console.error(`  - ${problem}`);
  console.error(
    '\nCheck "files" in package.json, and run npm run build first.'
  );
  process.exit(1);
}

console.log(`\n${pkg.name} packs, installs, and works from every entry point.`);

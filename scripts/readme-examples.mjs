// Run every JavaScript and TypeScript example in the README against an
// installed package, and check the values its comments promise. A line like
// `isString('a'); // true` or `console.log(isString(1)); // Output: false`
// becomes an assertion. Blocks that only show a signature (`function ...`) are
// skipped. Used by check-pack.mjs, which installs the packed tarball first.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BLOCK = /^```(javascript|js|ts|typescript)\n([\s\S]*?)^```/gm;
// `expression; // true` and `console.log(expression); // Output: false`
const LOGGED =
  /^(\s*)console\.log\((.+)\);\s*\/\/\s*(?:Output:\s*)?(true|false)\b/;
const BARE = /^(\s*)(.+);\s*\/\/\s*(true|false)\b/;
/**
 * Turn the commented values of a block into assertions.
 * @param {string} code
 * @returns {{ code: string, checks: number }}
 */
const withAssertions = (code) => {
  let checks = 0;

  const lines = code.split('\n').map((line) => {
    const match = line.match(LOGGED) ?? line.match(BARE);

    if (!match || /^\s*(const|let|var|import|declare)\b/.test(match[2]))
      return line;

    const [, indent, expression, expected] = match;

    checks += 1;

    return `${indent}__check(${JSON.stringify(expression)}, ${expression}, ${expected});`;
  });

  return { code: lines.join('\n'), checks };
};
const CHECK = `
const __check = (source, actual, expected) => {
  if (actual !== expected) {
    throw new Error(\`README says \${source} is \${expected}, but it is \${actual}\`);
  }
};
`;

/**
 * Run the README examples in app, where the package is installed.
 * @param {string} readme path to README.md
 * @param {string} app directory with the package installed
 * @param {object} pkg the package.json contents
 * @param {string[]} exported the names the package exports
 * @returns {{ problems: string[], blocks: number, checks: number }}
 */
export const runReadmeExamples = (readme, app, pkg, exported) => {
  const problems = [];

  let blocks = 0;
  let checks = 0;

  for (const [index, [, language, source]] of [
    ...readFileSync(readme, 'utf8').matchAll(BLOCK)
  ].entries()) {
    if (/^\s*function \w+/.test(source)) continue;

    const { code, checks: count } = withAssertions(
      // A declared value has no runtime value; give it one
      source.replace(
        /^(\s*)declare const (\w+)(:[^;=]+)?;/gm,
        '$1const $2 = undefined;'
      )
    );
    const usesRequire = /\brequire\(/.test(code);
    const importsPackage = /^\s*import .* from/m.test(code);
    // Snippets use the helpers without importing them
    const header =
      importsPackage || usesRequire
        ? ''
        : `import { ${exported.join(', ')} } from ${JSON.stringify(pkg.name)};\n`;
    const extension = usesRequire
      ? 'cjs'
      : language.startsWith('t')
        ? 'mts'
        : 'mjs';
    const file = join(app, `readme-example-${index}.${extension}`);

    writeFileSync(file, `${header}${CHECK}${code}`);
    blocks += 1;
    checks += count;

    try {
      execFileSync('node', ['--no-warnings', file], {
        cwd: app,
        encoding: 'utf8',
        stdio: 'pipe'
      });
    } catch (error) {
      const first = source.trim().split('\n')[0];

      problems.push(
        `the README example starting "${first}" fails: ${
          (error.stderr || error.message)
            .trim()
            .split('\n')
            .find((line) => /^\w*Error\b/.test(line)) ?? error.message
        }`
      );
    }
  }

  return { problems, blocks, checks };
};

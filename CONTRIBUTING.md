# Contributing to typeof

First off, thanks for taking the time to contribute! ❤️

All types of contributions are encouraged and valued. See the
[Table of Contents](#table-of-contents) for different ways to help and details
about how this project handles them. Please read the relevant section before
making your contribution. It makes it a lot easier for the maintainer and
smooths out the experience for everyone involved.

> And if you like the project, but don't have time to contribute, that's fine.
> There are other easy ways to support the project and show your appreciation:
>
> - Star the project
> - Mention it in your project's readme
> - Tell your friends and colleagues about it

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [I Have a Question](#i-have-a-question)
- [I Want To Contribute](#i-want-to-contribute)
  - [Reporting Bugs](#reporting-bugs)
  - [Suggesting Enhancements](#suggesting-enhancements)
  - [Contributing Code](#contributing-code)
    - [Development](#development)
    - [Coding Style](#coding-style)
    - [Tests](#tests)
    - [Developer Certificate of Origin](#developer-certificate-of-origin)
    - [Commits and Pull Requests](#commits-and-pull-requests)
    - [Releases](#releases)
- [Attribution](#attribution)

## Code of Conduct

This project and everyone participating in it is governed by the
[typeof Code of Conduct](https://github.com/phun-ky/typeof/blob/main/CODE_OF_CONDUCT.md).
By participating, you are expected to uphold this code. Please report
unacceptable behaviour to <code-of-conduct@phun-ky.net>.

## I Have a Question

> If you want to ask a question, we assume that you have read the
> [README](https://github.com/phun-ky/typeof#readme), which documents every
> helper.

Before you ask a question, search the existing
[issues](https://github.com/phun-ky/typeof/issues) that might help you. If you
find a suitable issue and still need clarification, write your question in that
issue.

If you still need to ask a question:

- Open an [issue](https://github.com/phun-ky/typeof/issues/new).
- Provide as much context as you can about what you're running into.
- Provide the versions of the package, Node.js and npm, or the browser and
  bundler, as relevant.

## I Want To Contribute

> ### Legal Notice
>
> When contributing to this project, you must agree that you have authored 100%
> of the content, that you have the necessary rights to the content and that the
> content you contribute may be provided under the project licence. You confirm
> this on every commit by signing it off under the
> [Developer Certificate of Origin](#developer-certificate-of-origin).

### Reporting Bugs

#### Before Submitting a Bug Report

A good bug report shouldn't leave others needing to chase you up for more
information. Please:

- Make sure that you are using the latest version.
- Check that it's really a bug and not an error on your side, for example an
  unsupported environment. Read the
  [README](https://github.com/phun-ky/typeof#readme) first.
- Search the
  [bug tracker](https://github.com/phun-ky/typeof/issues?q=label%3A%22problems%3A+%F0%9F%90%9B+bug%22)
  to see if the bug has already been reported.
- Collect information about the bug:
  - the error message and stack trace, if any
  - the Node.js and npm versions, or the browser and bundler
  - how you import the package (`import` or `require`)
  - the value you passed and the result you got
  - whether you can reproduce it reliably, and with older versions

#### How Do I Submit a Good Bug Report?

> Never report security issues, vulnerabilities or bugs that include sensitive
> information in the issue tracker or elsewhere in public. Report them privately
> as described in the [security policy](SECURITY.md#reporting-a-vulnerability).

Bugs are tracked as GitHub issues. If you run into a problem:

- Open an [issue](https://github.com/phun-ky/typeof/issues/new) with the bug
  report template.
- Explain the behaviour you expected and the actual behaviour.
- Describe the steps to reproduce it, ideally as a call to the helper with the
  value that shows the problem, such as `isObjectPlain(value)`.
- Add the information you collected above.

Once it's filed, the maintainer labels it and tries to reproduce it. Without a
way to reproduce it, the issue is marked `pending: need repro` until there is
one. A reproduced bug is marked `🐛 needs fix`.

### Suggesting Enhancements

Enhancements, from new helpers to small improvements, are tracked as
[GitHub issues](https://github.com/phun-ky/typeof/issues).

Before suggesting one:

- Make sure that you are using the latest version, and read the
  [README](https://github.com/phun-ky/typeof#readme) to see if it's already
  possible.
- [Search](https://github.com/phun-ky/typeof/issues) for an existing suggestion,
  and add to it instead of opening a new one.
- Check that it fits the [roadmap](ROADMAP.md), including what is not planned.

A good suggestion has a clear title, describes the current behaviour and the
behaviour you'd like instead, and explains why it would be useful to most users.

### Contributing Code

Larger changes are best discussed in an issue first, so the work fits the
[roadmap](ROADMAP.md).

#### Development

You need Node.js 24 and npm 11.

```shell-session
npm ci
npm run build
npm test
npm run check:pack
```

| Command                   | What it does                                                                                                                         |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run build`           | Builds `dist` with rollup: an ES module, a CommonJS build and the types                                                              |
| `npm run rollup:dev`      | Builds and rebuilds on every change                                                                                                  |
| `npm test`                | Runs the tests                                                                                                                       |
| `npm run test:ci`         | Runs the tests with coverage, as CI does                                                                                             |
| `npm run typecheck`       | Type-checks the source and the tests                                                                                                 |
| `npm run style:lint`      | Lints every file, Markdown and tests included, with ESLint, and checks the formatting of `src` with Prettier                         |
| `npm run style:format`    | Fixes what `style:lint` can fix                                                                                                      |
| `npm run style:code`      | Suggests code improvements with putout                                                                                               |
| `npm run check:pack`      | Packs the package, installs it in an empty project, calls the helpers from every entry point and runs the README examples against it |
| `npm run docs:gen`        | Generates the API reference in `api/` with TypeDoc                                                                                   |
| `npm run release:dry-run` | Shows whether merging would release, and the planned version and changelog                                                           |

Run `npm run check:pack` after `npm run build`. To also run the package on the
oldest Node.js it supports, as CI does, set `CHECK_PACK_NODE` to a Node.js
22.0.0 binary.

#### Coding Style

Code follows the project's [ESLint](https://eslint.org/) configuration
(`eslint-config-phun-ky`), [Prettier](https://prettier.io/) formatting and
TypeScript in strict mode. A contribution must pass `npm run style:lint` and
`npm run typecheck` with no errors. Both run in CI on every pull request, and a
pull request that fails them can't be merged.

#### Tests

- **New functionality must come with tests** in `src/__tests__`, run by
  `npm test` with Node's test runner. Node runs the TypeScript itself, so test
  files import the source with its `.ts` extension.
- **Bug fixes must come with a regression test** that fails without the fix.
- **Packaging changes** are tested by `npm run check:pack`, which runs in CI.
- **Coverage stays at 100%.** `npm run test:ci` fails when the source falls
  below 100% of lines, functions or branches, and CI uploads a coverage report
  for every pull request. Don't exclude code from coverage; test it instead.
- **README examples are tested too:** `npm run check:pack` runs them and checks
  the values in their comments, such as `// true`.

#### Developer Certificate of Origin

Every commit must be signed off under the
[Developer Certificate of Origin](https://developercertificate.org/) (DCO): a
statement that you wrote the change, or otherwise have the right to submit it
under the project's licence. You agree to it by adding a `Signed-off-by` line
with your name and email to the commit message:

```text
Signed-off-by: Your Name <you@example.com>
```

- **Per commit:** `git commit -s` adds the line for you.
- **Always:** `npm ci` sets `core.hooksPath` to `.githooks`, and the hook in
  `.githooks/prepare-commit-msg` adds the line to every commit, including those
  made by `npm run commit` or your editor.
- **Forgot?** Sign off every commit on your branch and push again:
  `git rebase --signoff main` then `git push --force-with-lease`.

The DCO check on every pull request fails if a commit isn't signed off.

#### Commits and Pull Requests

- Commits follow [Conventional Commits](https://www.conventionalcommits.org/)
  (`feat:`, `fix:`, `docs:`, ...). `npm run commit` helps write them. Releases
  and the changelog are generated from them (see [Releases](#releases)), so pick
  the type that matches the change. A breaking change needs a `type!:` and a
  `BREAKING CHANGE:` footer that says what to change.
- Deprecating an API isn't a breaking change, so it can land in any release.
  Mark it `@deprecated` with its replacement and the major it will be removed
  in. It keeps working through one full major: deprecated during 3.x or at 4.0,
  it can be removed in 5.0 at the earliest.
- Don't commit the regenerated API reference (`api/`); each release regenerates
  it.
- Open a pull request against `main`. The Checks workflow lints, type-checks,
  builds, packs and tests; dependency review, CodeQL and the DCO check also
  run. All of them must pass, and the branch must be up to date with `main`.

#### Releases

The maintainer merges pull requests, and releases follow automatically from
GitHub Actions:

1. When a merged pull request changes what gets published, the publish workflow
   checks whether there is anything to release: a `feat`, `fix`, `perf` or
   `revert` commit, or a breaking change, that touches the published files.
   Other changes wait for the next release.
2. If so, release-it picks the version from the commits, updates the changelog,
   builds and packs the package, and publishes it to npm with signed provenance.
3. The release commit and tag go to `main`, and a GitHub release is created with
   a software bill of materials attached.

`npm run release:dry-run` shows what a merge would release.

## Attribution

This guide is based on
[contributing-gen](https://github.com/bttger/contributing-gen).

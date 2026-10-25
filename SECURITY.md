# Security Policy

`@phun-ky/typeof` has no runtime dependencies. How development dependencies are
chosen, tracked and kept clear of known vulnerabilities is described under
[Dependencies](#dependencies).

## Supported Versions

Support follows the major version:

| Release                  | Supported |
| ------------------------ | --------- |
| `3.x`, the current major | ✅        |
| `2.x` and older          | ❌        |

- **The current major is supported as a whole.** Fixes are released as a new
  patch or minor of it, and upgrading within a major never breaks your code.
- **The previous major gets fixes for high and critical vulnerabilities for 6
  months** after the next major is released, as a patch on its latest release.
  This applies from 4.0 on: when 4.0 is released, 3.x gets these fixes for 6
  months.
- **Security comes before the deprecation grace period.** If a vulnerability
  can't be fixed without breaking an API, the fix may change or remove it in a
  patch or minor release instead of waiting for a major. The change is kept as
  small as possible, and the advisory and the release notes say what changed and
  why.

To get a fix, upgrade to the newest release of your major.

## Reporting a Vulnerability

Report vulnerabilities privately, either with GitHub's
[private vulnerability reporting](https://github.com/phun-ky/typeof/security/advisories/new)
or by email to <security@phun-ky.net>. Please don't open a public issue for a
security problem.

## How Reports Are Handled

1. **Acknowledgement:** you'll get a reply within 7 days confirming the report
   was received.
2. **Assessment:** the maintainer reproduces the issue and judges its severity,
   and may ask you for details.
3. **Fix:** a fix is developed in a private GitHub security advisory and
   released as a new version. The aim is a fix within 30 days for serious
   issues.
4. **Disclosure:** the advisory is published when the fix is released, with a
   CVE where one applies. Please keep the issue private until then.
5. **Credit:** reporters are credited in the advisory and the release notes,
   unless they ask to stay anonymous.

## Security Expectations

typeof is a set of type checks: each helper takes one value and returns a
boolean.

What you can rely on:

- **No side effects.** The helpers only read the value they're given and the
  built-ins they compare it with: no network, no file system, no writes to
  globals, no data collection. Importing the package only defines the helpers.
- **No dynamic code.** No `eval`, `new Function` or loading of code.
- **No runtime dependencies.** The builds contain only this package's code, and
  `npm run check:pack` fails a build that bundles or imports another package.
- **Releases are traceable.** Every release is built and published from GitHub
  Actions, with signed provenance (see below).

What you can't rely on:

- **Never throwing.** Most helpers always return a boolean, but
  `isObjectPlain`, `isObjectStrict` and `isInstanceOfUnknownClass` inspect the
  value's prototype or `Symbol.toStringTag`, and pass on errors from it: a proxy
  whose traps throw, a revoked proxy, or a `Symbol.toStringTag` getter that
  throws. Wrap the call in `try`/`catch` when the value comes from untrusted
  code ([#170](https://github.com/phun-ky/typeof/issues/170)).
- **Recognising another realm's built-ins.** Values from another realm, such
  as an iframe or a `node:vm` context, have their own built-ins.
  `isBuiltInConstructor` and `isBuiltInCallable` don't recognise them.
  `isObjectPlain` and `isObjectStrict` do recognise plain objects from another
  realm.

## Verifying Releases

Every release is published from GitHub Actions with npm trusted publishing, and
carries a signed provenance attestation (Sigstore) that links it to the commit
and workflow run that built it. To verify the package you've installed:

```sh
npm audit signatures
```

The provenance must name the repository `phun-ky/typeof` and the workflow
`.github/workflows/publish.yml`. The package's page on npm shows this under
"Provenance", and `npm view @phun-ky/typeof@<version> dist.attestations` lists
the attestations.

Releases after 3.0.9 also have a software bill of materials attached to their
GitHub release, in CycloneDX format (`typeof-<version>.cdx.json`).

## Dependencies

**Choosing them.** typeof has no runtime dependencies, and a new one would be
discussed in an issue first. A runtime dependency is declared in `dependencies`
and kept external in the ES module and CommonJS builds, never bundled into them;
`npm run check:pack` fails a build that breaks this rule. It must be widely
used, actively maintained and under an OSI-approved licence compatible with
MIT; strong copyleft licences (GPL, AGPL) are not accepted. Development
dependencies follow the same rules, judged more loosely.

**Obtaining them.** Packages come only from the npm registry, with exact
versions locked in `package-lock.json` and installed with `npm ci` in CI. GitHub
Actions are pinned to commit SHAs.

**Tracking them.** Dependabot proposes version updates weekly and security
updates as soon as an advisory is published. Every pull request runs
[dependency review](https://github.com/phun-ky/typeof/blob/main/.github/workflows/dependency-review.yml),
and every release runs `npm audit` on runtime dependencies first.

**Fixing known vulnerabilities.** Findings are checked against the GitHub
Advisory Database:

| Finding                    | Where                  | What happens                                                                                     |
| -------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------ |
| Critical or high           | Runtime dependency     | Blocks merging (dependency review) and releasing (`npm audit`); fixed and released within 7 days |
| Critical or high           | Development dependency | Blocks merging when introduced; an existing one is fixed within 30 days                          |
| Moderate or low            | Any dependency         | Fixed with the next update, within 90 days                                                       |
| Licence outside the policy | New runtime dependency | Not merged                                                                                       |

A development dependency whose parent, at its latest release, still requires a
vulnerable version is fixed with a targeted override in `package.json`, after
checking that the tools still work. Overrides don't reach users of the package,
which has no runtime dependencies to override.

**Accepted exceptions.** A vulnerability that can't be fixed yet and can't be
exploited through this project would be allowed in dependency review and listed
here, until a fix is reachable. There are none.

## Code Scanning

CodeQL analyses every pull request and every push to `main`. The ruleset on
`main` blocks merging while CodeQL reports an error, or a security alert of high
or critical severity. OpenSSF Scorecard runs on every push to `main`, with
results at <https://scorecard.dev/viewer/?uri=github.com/phun-ky/typeof>.

## Secrets

The project keeps as few secrets as possible:

| Secret          | Used by       | For                                                   |
| --------------- | ------------- | ----------------------------------------------------- |
| `GH_TOKEN`      | `publish.yml` | Pushing release commits and tags, and GitHub releases |
| `CODECOV_TOKEN` | `check.yml`   | Uploading coverage reports                            |

Publishing to npm needs no secret: it uses short-lived OIDC tokens from GitHub.

- **Storage:** secrets are kept only as encrypted GitHub Actions secrets, never
  in the repository. Secret scanning with push protection blocks commits that
  contain one.
- **Access:** only the maintainer can view or change them, and they are not
  available to workflows run from forks.
- **Rotation:** at least once a year, and immediately if one may have been
  exposed.

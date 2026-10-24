# Roadmap

What typeof intends to do, and not do, from October 2026 to October 2027. It's
a plan, not a promise: priorities can change, and changes to this file are made
in pull requests like any other. Individual pieces of work are tracked as
[GitHub issues](https://github.com/phun-ky/typeof/issues), grouped in
milestones.

## Planned

### Keeping 3.x stable

The helpers work in Node.js (ES modules and CommonJS, from Node 22.0.0),
bundlers, browsers and TypeScript. Every release is checked by installing the
packed package and calling it from each entry point, on Node 24 and on Node
22.0.0, and by running the README examples against it. From here:

- **No breaking changes in 3.x.** See the
  [security policy](SECURITY.md#supported-versions) for which versions get
  fixes.
- **Deprecations before removals:** a deprecated API keeps working through one
  full major.

### 4.0: ES modules only

- **Drop the CommonJS build** and require Node 22.12 or later, where
  `require()` loads ES modules. This is breaking for `require()` users on Node
  22.0 to 22.11, so it waits for 4.0, with an upgrading guide
  ([#151](https://github.com/phun-ky/typeof/issues/151)).

### Project health

- **OpenSSF Best Practices:** the passing badge, then silver and OSPS Baseline
  ([#146](https://github.com/phun-ky/typeof/issues/146)).
- **TypeScript 7**, once the tools the build and lint depend on support it
  ([#153](https://github.com/phun-ky/typeof/issues/153)).
- **A second maintainer**, so that pull requests get a review from someone other
  than the author and access to the project doesn't rest on one person; see
  [governance](GOVERNANCE.md#continuity).

## Not planned

- **A documentation site.** The package is small, so the README holds the whole
  API reference
  ([#145](https://github.com/phun-ky/typeof/issues/145)).
- **Runtime dependencies.** typeof has none. Should one ever be needed, it is
  declared and installed from npm, never bundled into the builds.
- **Collecting data.** The package doesn't collect, store or send data anywhere.

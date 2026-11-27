// Content of the release banners for 3.0. Copy this file for the next major
// (e.g. 4.0.mjs) and run: npm run banners -- 4.0
export default {
  slug: 'v3',
  pill: 'Release 3.0 · May 2026',
  title: ['Check the type,', { accent: 'narrow the value' }],
  body: 'typeof 3.0 needs Node.js 22 or later. Its helpers narrow types in TypeScript, load through import and require(), and isObjectPlain counts plain objects from another realm.',
  // The panel: calls from the README examples, with the values they return
  panel: {
    label: '@phun-ky/typeof',
    status: 'ESM · CJS',
    checks: [
      { call: "isString('asd')", result: true },
      { call: 'isObjectStrict({})', result: true },
      { call: 'isObjectStrict([])', result: false },
      { call: 'isBuiltInCallable(Symbol)', result: true },
      { call: 'isClass(() => {})', result: false }
    ]
  }
};

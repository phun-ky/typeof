/* eslint-disable import/no-unused-modules */
/**
 * @overload
 */
export function isString(value: unknown): value is string;

/**
 * @overload
 */
export function isString(value: unknown): boolean;

/**
 * Checks if the given value is a string.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a string, false otherwise.
 */
export function isString(value: unknown): boolean {
  return typeof value === 'string';
}

/**
 * @overload
 */
export function isNotString<T>(value: T): value is Exclude<T, string>;

/**
 * @overload
 */
export function isNotString(value: unknown): boolean;

/**
 * Checks if the given value is not a string.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is not a string, false otherwise.
 */
export function isNotString(value: unknown): boolean {
  return !isString(value);
}

/**
 * @overload
 */
export function isNumber(value: unknown): value is number;

/**
 * @overload
 */
export function isNumber(value: unknown): boolean;

/**
 * Checks if the given value is a number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a number, false otherwise.
 */
export function isNumber(value: unknown): boolean {
  return typeof value === 'number';
}

/**
 * @overload
 */
export function isNotNumber<T>(value: T): value is Exclude<T, number>;

/**
 * @overload
 */
export function isNotNumber(value: unknown): boolean;

/**
 * Checks if the given value is not a number.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is not a number, false otherwise.
 */
export function isNotNumber(value: unknown): boolean {
  return !isNumber(value);
}

/**
 * @overload
 */
export function isBoolean(value: unknown): value is boolean;

/**
 * @overload
 */
export function isBoolean(value: unknown): boolean;

/**
 * Checks if the given value is a boolean.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is a boolean, false otherwise.
 */
export function isBoolean(value: unknown): boolean {
  return typeof value === 'boolean';
}

/**
 * @overload
 */
export function isNotBoolean<T>(value: T): value is Exclude<T, boolean>;

/**
 * @overload
 */
export function isNotBoolean(value: unknown): boolean;

/**
 * Checks if the given value is not a boolean.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is not a boolean, false otherwise.
 */
export function isNotBoolean(value: unknown): boolean {
  return !isBoolean(value);
}

/**
 * @overload
 */
export function isUndefined(value: unknown): value is undefined;

/**
 * @overload
 */
export function isUndefined(value: unknown): boolean;

/**
 * Checks if the given value is undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is undefined, false otherwise.
 */
export function isUndefined(value: unknown): boolean {
  return typeof value === 'undefined';
}

/**
 * @overload
 */
export function isNotUndefined<T>(value: T): value is Exclude<T, undefined>;

/**
 * @overload
 */
export function isNotUndefined(value: unknown): boolean;

/**
 * Checks if the given value is not undefined.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is not undefined, false otherwise.
 */
export function isNotUndefined(value: unknown): boolean {
  return !isUndefined(value);
}

/* node:coverage disable */
/**
 * @overload
 */
export function isDefined<T>(value: T): value is Exclude<T, undefined>;

/**
 * @overload
 */
export function isDefined(value: unknown): boolean;

/**
 * Copy of `isNotUndefined`
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} True if the value is defined, false otherwise.
 */
export function isDefined(value: unknown): boolean {
  return !isUndefined(value);
}
/* node:coverage enable */

/**
 * @overload
 */
export function isObjectPlain(value: unknown): value is Record<string, unknown>;

/**
 * @overload
 */
export function isObjectPlain(value: unknown): boolean;

/**
 * Determines whether a value is a plain object (i.e., created via an object literal,
 * `Object.create(null)`, or with `Object` as its prototype).
 *
 * This excludes arrays, functions, class instances, built-ins like `Date`/`Map`/`Set`,
 * and other exotic objects.
 *
 * @param {unknown} value - The value to test.
 * @returns {boolean} `true` if `value` is a plain object, otherwise `false`.
 *
 * @example
 * ```ts
 * const a: unknown = { x: 1 };
 * const b: unknown = [];
 * const c: unknown = new Date();
 * const d: unknown = Object.create(null);
 *
 * isObjectPlain(a); // true
 * isObjectPlain(b); // false (array)
 * isObjectPlain(c); // false (built-in)
 * isObjectPlain(d); // true (null prototype)
 *
 * // Type narrowing example:
 * const value: unknown = { foo: 42 };
 * if (isObjectPlain(value)) {
 *   // value is now Record<string, unknown>
 *   console.log(value.foo);
 * }
 * ```
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/toString
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf
 */
export function isObjectPlain(value: unknown): boolean {
  if (Object.prototype.toString.call(value) !== '[object Object]') return false;

  const proto = Object.getPrototypeOf(value);

  return proto === Object.prototype || proto === null;
}

/**
 * @overload
 */
export function isObjectStrict(
  value: unknown
): value is Record<string, unknown>;

/**
 * @overload
 */
export function isObjectStrict(value: unknown): boolean;

/**
 * Checks if a given value is a plain object.
 *
 * A plain object is an object created by the `{}` syntax, `Object.create(null)`,
 * or using `new Object()`. This function ensures that the value is an object
 * and does not have an unusual prototype chain.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a plain object, otherwise `false`.
 *
 * @example
 * ```ts
 * console.log(isObjectStrict({})); // Output: true
 * console.log(isObjectStrict(Object.create(null))); // Output: true
 * console.log(isObjectStrict([])); // Output: false
 * console.log(isObjectStrict(new Date())); // Output: false
 * console.log(isObjectStrict(null)); // Output: false
 * ```
 *
 * **Features**
 * - ✅ Recognizes only **plain objects** (created via `{}`, `new Object()`, `Object.create(null)`, etc.).
 * - ❌ Rejects **arrays**, **functions**, **DOM elements**, **class instances**, and **custom objects** with modified constructors.
 *
 * **Behavior**
 * - ✅ `isObjectStrict({})` → `true`
 * - ❌ `isObjectStrict([])` → `false`
 * - ❌ `isObjectStrict(() => {})` → `false`
 * - ✅ `isObjectStrict(Object.create(null))` → `true`
 *
 * **When to use**
 * - Use `isObjectStrict` when you need a **strict check for plain objects**.
 * - Use `isObjectLoose` if you need to check if a value is an **object-like structure**, including functions.
 */
export function isObjectStrict(value: unknown): boolean {
  if (typeof value !== 'object' || value === null) return false;

  if (Object.prototype.toString.call(value) !== '[object Object]') return false;

  const proto = Object.getPrototypeOf(value);

  if (proto === null) return true;

  const Ctor = Object.prototype.hasOwnProperty.call(proto, 'constructor')
    ? proto.constructor
    : null;

  return (
    typeof Ctor === 'function' &&
    Ctor instanceof Ctor &&
    Function.prototype.call(Ctor) === Function.prototype.call(value)
  );
}

/**
 * @overload
 */
export function isObjectLoose(value: unknown): value is object;

/**
 * @overload
 */
export function isObjectLoose(value: unknown): boolean;

/**
 * Checks if a given value is an object or a function.
 *
 * This function verifies whether the provided value is of type `'object'` or `'function'`
 * while ensuring that `null` is excluded.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an object or function, otherwise `false`.
 *
 * @example
 * ```ts
 * console.log(isObjectLoose({})); // Output: true
 * console.log(isObjectLoose([])); // Output: true
 * console.log(isObjectLoose(() => {})); // Output: true
 * console.log(isObjectLoose(null)); // Output: false
 * console.log(isObjectLoose(42)); // Output: false
 * ```
 *
 * **Features**
 * - ✅ Recognizes **all objects** (plain objects, arrays, functions, dates, etc.).
 * - ✅ Recognizes **functions** as objects (since functions are technically objects in JavaScript).
 * - ❌ Does **not** differentiate between plain objects and special objects (like arrays, functions, DOM nodes, etc.).
 *
 * **Behavior**
 * - ✅ `isObjectLoose({})` → `true`
 * - ✅ `isObjectLoose([])` → `true`
 * - ✅ `isObjectLoose(() => {})` → `true`
 * - ❌ `isObjectLoose(null)` → `false`
 *
 * **When to use**
 * - Use `isObjectStrict` when you need a **strict check for plain objects**.
 * - Use `isObjectLoose` if you need to check if a value is an **object-like structure**, including functions.
 *
 * **Comparison**
 * | Feature                | Strict Check (`isObjectStrict`) | Loose Check (`isObjectLoose`) |
 * |------------------------|----------------------|----------------------|
 * | Recognizes plain objects | ✅ Yes | ✅ Yes |
 * | Recognizes functions    | ❌ No | ✅ Yes |
 * | Recognizes arrays       | ❌ No | ✅ Yes |
 * | Recognizes `Object.create(null)` objects | ✅ Yes | ✅ Yes |
 * | Recognizes class instances | ❌ No | ✅ Yes |
 * | Recognizes DOM elements | ❌ No | ✅ Yes |
 * | Complexity             | 🔴 High | 🟢 Low |
 */
export function isObjectLoose(value: unknown): boolean {
  const type = typeof value;

  return value !== null && (type === 'object' || type === 'function');
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ClassCtor<T = any> = new (...args: any[]) => T;

/**
 * @overload
 */
export function isClass(value: unknown): value is ClassCtor;

/**
 * @overload
 */
export function isClass(value: unknown): boolean;

/**
 * Checks if a given value is a class constructor.
 *
 * This function determines whether the provided value is a class by verifying
 * if it is a function and checking its prototype descriptor. Class constructors
 * always have a non-writable prototype, while regular functions do not.
 *
 * Will always return false on built in constructors like `Date` or `Array`.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a class constructor, otherwise `false`.
 *
 * @example
 * ```ts
 * class MyClass {}
 * console.log(isClass(MyClass)); // Output: true
 *
 * function regularFunction() {}
 * console.log(isClass(regularFunction)); // Output: false
 *
 * console.log(isClass(() => {})); // Output: false
 * console.log(isClass(null)); // Output: false
 * ```
 */
export function isClass(value: unknown): boolean {
  if (typeof value !== 'function') return false;

  if (isBuiltInConstructor(value)) return false;

  try {
    // Check if the function has a valid prototype (classes always do)
    const descriptor = Object.getOwnPropertyDescriptor(value, 'prototype');

    return !!descriptor && !descriptor.writable; // Class prototypes are non-writable
  } catch {
    return false;
  }
}

/**
 * A union of standard JavaScript **constructable** built-ins
 * (e.g., `Object`, `Array`, `Date`, `Map`, etc.).
 */
export type BuiltInConstructor =
  | ObjectConstructor
  | ArrayConstructor
  | FunctionConstructor
  | StringConstructor
  | NumberConstructor
  | BooleanConstructor
  | DateConstructor
  | RegExpConstructor
  | ErrorConstructor
  | EvalErrorConstructor
  | RangeErrorConstructor
  | ReferenceErrorConstructor
  | SyntaxErrorConstructor
  | TypeErrorConstructor
  | URIErrorConstructor
  | MapConstructor
  | WeakMapConstructor
  | SetConstructor
  | WeakSetConstructor
  | PromiseConstructor;

/**
 * @overload
 */
export function isBuiltInConstructor(
  value: unknown
): value is BuiltInConstructor;

/**
 * @overload
 */
export function isBuiltInConstructor(value: unknown): boolean;

/**
 * Checks if a given value is a built-in JavaScript constructor.
 *
 * This function verifies whether the provided value is a function and matches
 * one of JavaScript's built-in constructors, such as `Object`, `Array`, `Function`, etc.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a built-in constructor, otherwise `false`.
 *
 * @example
 * ```ts
 * console.log(isBuiltInConstructor(Object)); // Output: true
 * console.log(isBuiltInConstructor(Array)); // Output: true
 * console.log(isBuiltInConstructor(class MyClass {})); // Output: false
 * console.log(isBuiltInConstructor(() => {})); // Output: false
 * console.log(isBuiltInConstructor(123)); // Output: false
 * ```
 */
export function isBuiltInConstructor(value: unknown): boolean {
  if (typeof value !== 'function') return false;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const builtins: Function[] = [
    Object,
    Array,
    Function,
    String,
    Number,
    Boolean,
    Date,
    RegExp,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Promise
  ];

  return builtins.includes(value as BuiltInConstructor);
}

/**
 * Built-in globals that are **callable**:
 * - All standard constructors (above)
 * - Plus callable, **non-constructable** built-ins: `BigInt` and `Symbol`
 */
export type BuiltInCallable =
  | BuiltInConstructor
  | typeof BigInt
  | typeof Symbol;

/**
 * Canonical set of built-in callables.
 * Note: identity is **realm-specific** (different iframes/VMs have different
 * constructor identities), so values from another realm won't match here.
 */
const BUILTIN_CALLABLES: ReadonlySet<BuiltInCallable> = new Set([
  Object,
  Array,
  Function,
  String,
  Number,
  Boolean,
  Date,
  RegExp,
  Error,
  EvalError,
  RangeError,
  ReferenceError,
  SyntaxError,
  TypeError,
  URIError,
  Map,
  WeakMap,
  Set,
  WeakSet,
  Promise,
  BigInt,
  Symbol
]);

/**
 * @overload
 */
export function isBuiltInCallable(value: unknown): value is BuiltInCallable;

/**
 * @overload
 */
export function isBuiltInCallable(value: unknown): boolean;

/**
 * Checks if a given value is a **built-in JavaScript callable**.
 *
 * A built-in callable is either:
 * - a standard **constructor** (e.g., `Object`, `Array`, `Date`, `Map`), or
 * - a callable **non-constructable** built-in (`BigInt`, `Symbol`).
 *
 * This function first verifies the value is a function, then tests identity
 * against a curated set of built-ins.
 *
 * Overloads:
 * - **Predicate:** narrows the value to `BuiltInCallable` on success.
 * - **Boolean:** usable in contexts that require a plain `(v) => boolean`.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a built-in callable, otherwise `false`.
 *
 * @example
 * ```ts
 * isBuiltInCallable(Object);       // true
 * isBuiltInCallable(Array);        // true
 * isBuiltInCallable(BigInt);       // true (callable but not a constructor)
 * isBuiltInCallable(Symbol);       // true (callable but not a constructor)
 * isBuiltInCallable(class X {});   // false
 * isBuiltInCallable(() => {});     // false
 * isBuiltInCallable(123);          // false
 *
 * // Type narrowing:
 * declare const fn: unknown;
 * if (isBuiltInCallable(fn)) {
 *   // fn is now typed as BuiltInCallable
 *   console.log(fn.name);
 * }
 * ```
 *
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/BigInt
 * @see https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Symbol
 */
export function isBuiltInCallable(value: unknown): boolean {
  return (
    typeof value === 'function' &&
    BUILTIN_CALLABLES.has(value as BuiltInCallable)
  );
}

/**
 * @overload
 */
export function isInstanceOfUnknownClass(value: unknown): value is object;

/**
 * @overload
 */
export function isInstanceOfUnknownClass(value: unknown): boolean;

/**
 * Checks if a given value is an instance of a non-standard (unknown) class.
 *
 * This function determines whether the provided value is an object and has a prototype
 * that is neither `Object.prototype` (standard object) nor `null` (no prototype).
 * It helps differentiate between instances of custom classes and plain objects.
 *
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an instance of a non-standard class, otherwise `false`.
 *
 * @example
 * ```ts
 * class MyClass {}
 * console.log(isInstanceOfUnknownClass(new MyClass())); // Output: true
 * console.log(isInstanceOfUnknownClass({})); // Output: false
 * console.log(isInstanceOfUnknownClass(Object.create(null))); // Output: false
 * console.log(isInstanceOfUnknownClass([])); // Output: true
 * ```
 */
export function isInstanceOfUnknownClass(value: unknown): boolean {
  return (
    typeof value === 'object' &&
    value !== null &&
    Object.getPrototypeOf(value) !== Object.prototype &&
    Object.getPrototypeOf(value) !== null
  );
}

/**
 * Checks if the given variable is a string.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is a string, false otherwise.
 */
export const isString = (variable: unknown): boolean =>
  typeof variable === 'string';

/**
 * Checks if the given variable is not a string.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is not a string, false otherwise.
 */
export const isNotString = (variable: unknown): boolean => !isString(variable);

/**
 * Checks if the given variable is a number.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is a number, false otherwise.
 */
export const isNumber = (variable: unknown): boolean =>
  typeof variable === 'number';

/**
 * Checks if the given variable is not a number.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is not a number, false otherwise.
 */
export const isNotNumber = (variable: unknown): boolean => !isNumber(variable);

/**
 * Checks if the given variable is a boolean.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is a boolean, false otherwise.
 */
export const isBoolean = (variable: unknown): boolean =>
  typeof variable === 'boolean';

/**
 * Checks if the given variable is not a boolean.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is not a boolean, false otherwise.
 */
export const isNotBoolean = (variable: unknown): boolean =>
  !isBoolean(variable);

/**
 * Checks if the given variable is undefined.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is undefined, false otherwise.
 */
export const isUndefined = (variable: unknown): boolean =>
  typeof variable === 'undefined';

/**
 * Checks if the given variable is not undefined.
 *
 * @param {unknown} variable - The variable to check.
 * @returns {boolean} True if the variable is not undefined, false otherwise.
 */
export const isNotUndefined = (variable: unknown): boolean =>
  !isUndefined(variable);

/**
 * Determines whether a value is a plain object (i.e., created via an object literal,
 * `Object.create(null)`, or with `Object` as its prototype).
 *
 * This excludes arrays, functions, class instances, built-ins like `Date`/`Map`/`Set`,
 * and other exotic objects.
 *
 * @param {unknown} variable - The value to test.
 * @returns {boolean} `true` if `variable` is a plain object, otherwise `false`.
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
export const isObjectPlain = (variable: unknown): boolean => {
  if (Object.prototype.toString.call(variable) !== '[object Object]')
    return false;

  const proto = Object.getPrototypeOf(variable);

  return proto === Object.prototype || proto === null;
};

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
export const isObjectStrict = (value: unknown): boolean => {
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
};

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
export const isObjectLoose = (value: unknown): boolean => {
  const type = typeof value;

  return value !== null && (type === 'object' || type === 'function');
};

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
export const isClass = (value: unknown): boolean => {
  if (typeof value !== 'function') return false;

  if (isBuiltInConstructor(value)) return false;

  try {
    // Check if the function has a valid prototype (classes always do)
    const descriptor = Object.getOwnPropertyDescriptor(value, 'prototype');

    return !!descriptor && !descriptor.writable; // Class prototypes are non-writable
  } catch {
    return false;
  }
};

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
export const isBuiltInConstructor = (value: unknown): boolean => {
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
    Promise,
    BigInt,
    Symbol
  ];

  return builtins.includes(value);
};

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
export const isInstanceOfUnknownClass = (value: unknown): boolean =>
  typeof value === 'object' &&
  value !== null &&
  Object.getPrototypeOf(value) !== Object.prototype &&
  Object.getPrototypeOf(value) !== null;

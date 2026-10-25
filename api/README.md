# typeof API Documentation

---

> Last updated 2026-10-25T09:25:37.416Z

## Type Aliases

### BuiltInCallable

```ts
type BuiltInCallable = BuiltInConstructor | typeof BigInt | typeof Symbol;
```

Defined in: [main.ts:536](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L536)

Built-in globals that are **callable**:

- All standard constructors (above)
- Plus callable, **non-constructable** built-ins: `BigInt` and `Symbol`

---

### BuiltInConstructor

```ts
type BuiltInConstructor =
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
```

Defined in: [main.ts:449](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L449)

A union of standard JavaScript **constructable** built-ins
(e.g., `Object`, `Array`, `Date`, `Map`, etc.).

## Functions

### isBoolean()

Checks if the given value is a boolean.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isBoolean(value): value is boolean;
```

Defined in: [main.ts:84](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L84)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is boolean`

#### Call Signature

```ts
function isBoolean(value): boolean;
```

Defined in: [main.ts:89](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L89)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isBuiltInCallable()

Checks if a given value is a **built-in JavaScript callable**.

A built-in callable is either:

- a standard **constructor** (e.g., `Object`, `Array`, `Date`, `Map`), or
- a callable **non-constructable** built-in (`BigInt`, `Symbol`).

This function first verifies the value is a function, then tests identity
against a curated set of built-ins.

Overloads:

- **Predicate:** narrows the value to `BuiltInCallable` on success.
- **Boolean:** usable in contexts that require a plain `(v) => boolean`.

#### Param

**value**

The value to check.

#### Example

```ts
isBuiltInCallable(Object); // true
isBuiltInCallable(Array); // true
isBuiltInCallable(BigInt); // true (callable but not a constructor)
isBuiltInCallable(Symbol); // true (callable but not a constructor)
isBuiltInCallable(class X {}); // false
isBuiltInCallable(() => {}); // false
isBuiltInCallable(123); // false

// Type narrowing:
declare const fn: unknown;
if (isBuiltInCallable(fn)) {
  // fn is now typed as BuiltInCallable
  console.log(fn.name);
}
```

#### See

- https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global\_Objects
- https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global\_Objects/BigInt
- https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global\_Objects/Symbol

#### Call Signature

```ts
function isBuiltInCallable(value): value is BuiltInCallable;
```

Defined in: [main.ts:572](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L572)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is BuiltInCallable`

#### Call Signature

```ts
function isBuiltInCallable(value): boolean;
```

Defined in: [main.ts:577](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L577)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isBuiltInConstructor()

Checks if a given value is a built-in JavaScript constructor.

This function verifies whether the provided value is a function and matches
one of JavaScript's built-in constructors, such as `Object`, `Array`, `Function`, etc.

#### Param

**value**

The value to check.

#### Example

```ts
console.log(isBuiltInConstructor(Object)); // Output: true
console.log(isBuiltInConstructor(Array)); // Output: true
console.log(isBuiltInConstructor(class MyClass {})); // Output: false
console.log(isBuiltInConstructor(() => {})); // Output: false
console.log(isBuiltInConstructor(123)); // Output: false
```

#### Call Signature

```ts
function isBuiltInConstructor(value): value is BuiltInConstructor;
```

Defined in: [main.ts:474](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L474)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is BuiltInConstructor`

#### Call Signature

```ts
function isBuiltInConstructor(value): boolean;
```

Defined in: [main.ts:481](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L481)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isClass()

Checks if a given value is a class constructor.

This function determines whether the provided value is a class by verifying
if it is a function and checking its prototype descriptor. Class constructors
always have a non-writable prototype, while regular functions do not.

Will always return false on built in constructors like `Date` or `Array`.

#### Param

**value**

The value to check.

#### Example

```ts
class MyClass {}
console.log(isClass(MyClass)); // Output: true

function regularFunction() {}
console.log(isClass(regularFunction)); // Output: false

console.log(isClass(() => {})); // Output: false
console.log(isClass(null)); // Output: false
```

#### Call Signature

```ts
function isClass(value): value is ClassCtor<any>;
```

Defined in: [main.ts:397](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L397)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is ClassCtor<any>`

#### Call Signature

```ts
function isClass(value): boolean;
```

Defined in: [main.ts:402](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L402)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isDefined()

Copy of `isNotUndefined`

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isDefined<T>(value): value is Exclude<T, undefined>;
```

Defined in: [main.ts:164](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L164)

##### Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-t"></a> `T` |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `T`  |

##### Returns

`value is Exclude<T, undefined>`

#### Call Signature

```ts
function isDefined(value): boolean;
```

Defined in: [main.ts:169](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L169)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isFunction()

Checks if the given value is a function.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isFunction(value): value is (args: unknown[]) => unknown;
```

Defined in: [main.ts:666](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L666)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is (args: unknown[]) => unknown`

#### Call Signature

```ts
function isFunction(value): boolean;
```

Defined in: [main.ts:673](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L673)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isInstanceOfUnknownClass()

Checks if a given value is an instance of a non-standard (unknown) class.

This function determines whether the provided value is an object and has a prototype
that is neither `Object.prototype` (standard object) nor `null` (no prototype).
It helps differentiate between instances of custom classes and plain objects.

#### Param

**value**

The value to check.

#### Example

```ts
class MyClass {}
console.log(isInstanceOfUnknownClass(new MyClass())); // Output: true
console.log(isInstanceOfUnknownClass({})); // Output: false
console.log(isInstanceOfUnknownClass(Object.create(null))); // Output: false
console.log(isInstanceOfUnknownClass([])); // Output: true
```

#### Call Signature

```ts
function isInstanceOfUnknownClass(value): value is object;
```

Defined in: [main.ts:628](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L628)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is object`

#### Call Signature

```ts
function isInstanceOfUnknownClass(value): boolean;
```

Defined in: [main.ts:633](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L633)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isNotBoolean()

Checks if the given value is not a boolean.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isNotBoolean<T>(value): value is Exclude<T, boolean>;
```

Defined in: [main.ts:104](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L104)

##### Type Parameters

| Type Parameter                      |
| ----------------------------------- |
| <a id="type-parameter-t-1"></a> `T` |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `T`  |

##### Returns

`value is Exclude<T, boolean>`

#### Call Signature

```ts
function isNotBoolean(value): boolean;
```

Defined in: [main.ts:109](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L109)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isNotNumber()

Checks if the given value is not a number.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isNotNumber<T>(value): value is Exclude<T, number>;
```

Defined in: [main.ts:64](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L64)

##### Type Parameters

| Type Parameter                      |
| ----------------------------------- |
| <a id="type-parameter-t-2"></a> `T` |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `T`  |

##### Returns

`value is Exclude<T, number>`

#### Call Signature

```ts
function isNotNumber(value): boolean;
```

Defined in: [main.ts:69](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L69)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isNotString()

Checks if the given value is not a string.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isNotString<T>(value): value is Exclude<T, string>;
```

Defined in: [main.ts:24](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L24)

##### Type Parameters

| Type Parameter                      |
| ----------------------------------- |
| <a id="type-parameter-t-3"></a> `T` |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `T`  |

##### Returns

`value is Exclude<T, string>`

#### Call Signature

```ts
function isNotString(value): boolean;
```

Defined in: [main.ts:29](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L29)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isNotUndefined()

Checks if the given value is not undefined.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isNotUndefined<T>(value): value is Exclude<T, undefined>;
```

Defined in: [main.ts:144](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L144)

##### Type Parameters

| Type Parameter                      |
| ----------------------------------- |
| <a id="type-parameter-t-4"></a> `T` |

##### Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `T`  |

##### Returns

`value is Exclude<T, undefined>`

#### Call Signature

```ts
function isNotUndefined(value): boolean;
```

Defined in: [main.ts:149](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L149)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isNumber()

Checks if the given value is a number.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isNumber(value): value is number;
```

Defined in: [main.ts:44](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L44)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is number`

#### Call Signature

```ts
function isNumber(value): boolean;
```

Defined in: [main.ts:49](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L49)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isObjectLoose()

Checks if a given value is an object or a function.

This function verifies whether the provided value is of type `'object'` or `'function'`
while ensuring that `null` is excluded.

#### Param

**value**

The value to check.

#### Example

```ts
console.log(isObjectLoose({})); // Output: true
console.log(isObjectLoose([])); // Output: true
console.log(isObjectLoose(() => {})); // Output: true
console.log(isObjectLoose(null)); // Output: false
console.log(isObjectLoose(42)); // Output: false
```

**Features**

- ✅ Recognizes **all objects** (plain objects, arrays, functions, dates, etc.).
- ✅ Recognizes **functions** as objects (since functions are technically objects in JavaScript).
- ❌ Does **not** differentiate between plain objects and special objects (like arrays, functions, DOM nodes, etc.).

**Behavior**

- ✅ `isObjectLoose({})` → `true`
- ✅ `isObjectLoose([])` → `true`
- ✅ `isObjectLoose(() => {})` → `true`
- ❌ `isObjectLoose(null)` → `false`

**When to use**

- Use `isObjectStrict` when you need a **strict check for plain objects**.
- Use `isObjectLoose` if you need to check if a value is an **object-like structure**, including functions.

**Comparison**

| Feature                                  | Strict Check (`isObjectStrict`) | Loose Check (`isObjectLoose`) |
| ---------------------------------------- | ------------------------------- | ----------------------------- |
| Recognizes plain objects                 | ✅ Yes                          | ✅ Yes                        |
| Recognizes functions                     | ❌ No                           | ✅ Yes                        |
| Recognizes arrays                        | ❌ No                           | ✅ Yes                        |
| Recognizes `Object.create(null)` objects | ✅ Yes                          | ✅ Yes                        |
| Recognizes class instances               | ❌ No                           | ✅ Yes                        |
| Recognizes DOM elements                  | ❌ No                           | ✅ Yes                        |
| Complexity                               | 🔴 High                         | 🟢 Low                        |

#### Call Signature

```ts
function isObjectLoose(value): value is object;
```

Defined in: [main.ts:321](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L321)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is object`

#### Call Signature

```ts
function isObjectLoose(value): boolean;
```

Defined in: [main.ts:326](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L326)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isObjectPlain()

Determines whether a value is a plain object (i.e., created via an object literal,
`Object.create(null)`, or with `Object` as its prototype).

This excludes arrays, functions, class instances, built-ins like `Date`/`Map`/`Set`,
and other exotic objects.

Plain objects from another realm, such as an iframe or a `node:vm` context,
count too.

#### Param

**value**

The value to test.

#### Example

```ts
const a: unknown = { x: 1 };
const b: unknown = [];
const c: unknown = new Date();
const d: unknown = Object.create(null);

isObjectPlain(a); // true
isObjectPlain(b); // false (array)
isObjectPlain(c); // false (built-in)
isObjectPlain(d); // true (null prototype)

// Type narrowing example:
const value: unknown = { foo: 42 };
if (isObjectPlain(value)) {
  // value is now Record<string, unknown>
  console.log(value.foo);
}
```

#### See

- https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global\_Objects/Object/toString
- https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global\_Objects/Object/getPrototypeOf

#### Call Signature

```ts
function isObjectPlain(value): value is Record<string, unknown>;
```

Defined in: [main.ts:184](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L184)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is Record<string, unknown>`

#### Call Signature

```ts
function isObjectPlain(value): boolean;
```

Defined in: [main.ts:189](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L189)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isObjectStrict()

Checks if a given value is a plain object.

A plain object is an object created by the `{}` syntax, `Object.create(null)`,
or using `new Object()`. This function ensures that the value is an object
and does not have an unusual prototype chain.

#### Param

**value**

The value to check.

#### Example

```ts
console.log(isObjectStrict({})); // Output: true
console.log(isObjectStrict(Object.create(null))); // Output: true
console.log(isObjectStrict([])); // Output: false
console.log(isObjectStrict(new Date())); // Output: false
console.log(isObjectStrict(null)); // Output: false
```

**Features**

- ✅ Recognizes only **plain objects** (created via `{}`, `new Object()`, `Object.create(null)`, etc.).
- ❌ Rejects **arrays**, **functions**, **DOM elements**, **class instances**, and **custom objects** with modified constructors.

**Behavior**

- ✅ `isObjectStrict({})` → `true`
- ❌ `isObjectStrict([])` → `false`
- ❌ `isObjectStrict(() => {})` → `false`
- ✅ `isObjectStrict(Object.create(null))` → `true`

**When to use**

- Use `isObjectStrict` when you need a **strict check for plain objects**.
- Use `isObjectLoose` if you need to check if a value is an **object-like structure**, including functions.

#### Call Signature

```ts
function isObjectStrict(value): value is Record<string, unknown>;
```

Defined in: [main.ts:253](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L253)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is Record<string, unknown>`

#### Call Signature

```ts
function isObjectStrict(value): boolean;
```

Defined in: [main.ts:260](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L260)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isString()

Checks if the given value is a string.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isString(value): value is string;
```

Defined in: [main.ts:4](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L4)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is string`

#### Call Signature

```ts
function isString(value): boolean;
```

Defined in: [main.ts:9](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L9)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

### isUndefined()

Checks if the given value is undefined.

#### Param

**value**

The value to check.

#### Call Signature

```ts
function isUndefined(value): value is undefined;
```

Defined in: [main.ts:124](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L124)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`value is undefined`

#### Call Signature

```ts
function isUndefined(value): boolean;
```

Defined in: [main.ts:129](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L129)

##### Parameters

| Parameter | Type      |
| --------- | --------- |
| `value`   | `unknown` |

##### Returns

`boolean`

---

**Contributing**

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/typeof/blob/main/CONTRIBUTING.md) and [CODE\_OF\_CONDUCT.md](https://github.com/phun-ky/typeof/blob/main/CODE_OF_CONDUCT.md)

**Sponsor me**

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

---

This project created by [Alexander Vassbotn Røyne-Helgesen](http://phun-ky.net) is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).

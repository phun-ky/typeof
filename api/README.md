# typeof API Documentation

---

> Last updated 2025-05-04T07:10:59.014Z

## Functions

### isBoolean()

```ts
function isBoolean(variable): boolean;
```

Defined in: [main.ts:42](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L42)

Checks if the given variable is a boolean.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is a boolean, false otherwise.

---

### isBuiltInConstructor()

```ts
function isBuiltInConstructor(value): boolean;
```

Defined in: [main.ts:232](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L232)

Checks if a given value is a built-in JavaScript constructor.

This function verifies whether the provided value is a function and matches
one of JavaScript's built-in constructors, such as `Object`, `Array`, `Function`, etc.

#### Parameters

| Parameter | Type      | Description         |
| --------- | --------- | ------------------- |
| `value`   | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is a built-in constructor, otherwise `false`.

#### Example

```ts
console.log(isBuiltInConstructor(Object)); // Output: true
console.log(isBuiltInConstructor(Array)); // Output: true
console.log(isBuiltInConstructor(class MyClass {})); // Output: false
console.log(isBuiltInConstructor(() => {})); // Output: false
console.log(isBuiltInConstructor(123)); // Output: false
```

---

### isClass()

```ts
function isClass(value): boolean;
```

Defined in: [main.ts:199](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L199)

Checks if a given value is a class constructor.

This function determines whether the provided value is a class by verifying
if it is a function and checking its prototype descriptor. Class constructors
always have a non-writable prototype, while regular functions do not.

Will always return false on built in constructors like `Date` or `Array`.

#### Parameters

| Parameter | Type      | Description         |
| --------- | --------- | ------------------- |
| `value`   | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is a class constructor, otherwise `false`.

#### Example

```ts
class MyClass {}
console.log(isClass(MyClass)); // Output: true

function regularFunction() {}
console.log(isClass(regularFunction)); // Output: false

console.log(isClass(() => {})); // Output: false
console.log(isClass(null)); // Output: false
```

---

### isInstanceOfUnknownClass()

```ts
function isInstanceOfUnknownClass(value): boolean;
```

Defined in: [main.ts:283](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L283)

Checks if a given value is an instance of a non-standard (unknown) class.

This function determines whether the provided value is an object and has a prototype
that is neither `Object.prototype` (standard object) nor `null` (no prototype).
It helps differentiate between instances of custom classes and plain objects.

#### Parameters

| Parameter | Type      | Description         |
| --------- | --------- | ------------------- |
| `value`   | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is an instance of a non-standard class, otherwise `false`.

#### Example

```ts
class MyClass {}
console.log(isInstanceOfUnknownClass(new MyClass())); // Output: true
console.log(isInstanceOfUnknownClass({})); // Output: false
console.log(isInstanceOfUnknownClass(Object.create(null))); // Output: false
console.log(isInstanceOfUnknownClass([])); // Output: true
```

---

### isNotBoolean()

```ts
function isNotBoolean(variable): boolean;
```

Defined in: [main.ts:51](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L51)

Checks if the given variable is not a boolean.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is not a boolean, false otherwise.

---

### isNotNumber()

```ts
function isNotNumber(variable): boolean;
```

Defined in: [main.ts:34](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L34)

Checks if the given variable is not a number.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is not a number, false otherwise.

---

### isNotString()

```ts
function isNotString(variable): boolean;
```

Defined in: [main.ts:17](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L17)

Checks if the given variable is not a string.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is not a string, false otherwise.

---

### isNotUndefined()

```ts
function isNotUndefined(variable): boolean;
```

Defined in: [main.ts:69](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L69)

Checks if the given variable is not undefined.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is not undefined, false otherwise.

---

### isNumber()

```ts
function isNumber(variable): boolean;
```

Defined in: [main.ts:25](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L25)

Checks if the given variable is a number.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is a number, false otherwise.

---

### isObjectLoose()

```ts
function isObjectLoose(value): boolean;
```

Defined in: [main.ts:169](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L169)

Checks if a given value is an object or a function.

This function verifies whether the provided value is of type `'object'` or `'function'`
while ensuring that `null` is excluded.

#### Parameters

| Parameter | Type      | Description         |
| --------- | --------- | ------------------- |
| `value`   | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is an object or function, otherwise `false`.

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
| Feature | Strict Check (`isObjectStrict`) | Loose Check (`isObjectLoose`) |
|------------------------|----------------------|----------------------|
| Recognizes plain objects | ✅ Yes | ✅ Yes |
| Recognizes functions | ❌ No | ✅ Yes |
| Recognizes arrays | ❌ No | ✅ Yes |
| Recognizes `Object.create(null)` objects | ✅ Yes | ✅ Yes |
| Recognizes class instances | ❌ No | ✅ Yes |
| Recognizes DOM elements | ❌ No | ✅ Yes |
| Complexity | 🔴 High | 🟢 Low |

---

### isObjectStrict()

```ts
function isObjectStrict(value): boolean;
```

Defined in: [main.ts:105](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L105)

Checks if a given value is a plain object.

A plain object is an object created by the `{}` syntax, `Object.create(null)`,
or using `new Object()`. This function ensures that the value is an object
and does not have an unusual prototype chain.

#### Parameters

| Parameter | Type      | Description         |
| --------- | --------- | ------------------- |
| `value`   | `unknown` | The value to check. |

#### Returns

`boolean`

`true` if the value is a plain object, otherwise `false`.

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

---

### isString()

```ts
function isString(variable): boolean;
```

Defined in: [main.ts:8](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L8)

Checks if the given variable is a string.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is a string, false otherwise.

---

### isUndefined()

```ts
function isUndefined(variable): boolean;
```

Defined in: [main.ts:60](https://github.com/phun-ky/typeof/blob/main/src/main.ts#L60)

Checks if the given variable is undefined.

#### Parameters

| Parameter  | Type      | Description            |
| ---------- | --------- | ---------------------- |
| `variable` | `unknown` | The variable to check. |

#### Returns

`boolean`

True if the variable is undefined, false otherwise.

---

**Contributing**

Want to contribute? Please read the [CONTRIBUTING.md](https://github.com/phun-ky/typeof/blob/main/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](https://github.com/phun-ky/typeof/blob/main/CODE_OF_CONDUCT.md)

**Sponsor me**

I'm an Open Source evangelist, creating stuff that does not exist yet to help get rid of secondary activities and to enhance systems already in place, be it documentation or web sites.

The sponsorship is an unique opportunity to alleviate more hours for me to maintain my projects, create new ones and contribute to the large community we're all part of :)

[Support me on GitHub Sponsors](https://github.com/sponsors/phun-ky).

---

This project created by [Alexander Vassbotn Røyne-Helgesen](http://phun-ky.net) is licensed under a [MIT License](https://choosealicense.com/licenses/mit/).

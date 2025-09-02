import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  isBoolean,
  isNotBoolean,
  isNotNumber,
  isNotString,
  isNotUndefined,
  isNumber,
  isObjectLoose,
  isObjectStrict,
  isString,
  isUndefined,
  isClass,
  isBuiltInConstructor,
  isInstanceOfUnknownClass,
  isObjectPlain
} from '../main';

describe('isString', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isString('test'), true);
    assert.equal(isString(123), false);
    assert.equal(isString(true), false);
    assert.equal(isString(undefined), false);
  });
});
describe('isNotString', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isNotString('test'), false);
    assert.equal(isNotString(123), true);
    assert.equal(isNotString(true), true);
    assert.equal(isNotString(undefined), true);
  });
});
describe('isNumber', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isNumber(123), true);
    assert.equal(isNumber('test'), false);
    assert.equal(isNumber(true), false);
    assert.equal(isNumber(undefined), false);
  });
});
describe('isNotNumber', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isNotNumber(123), false);
    assert.equal(isNotNumber('test'), true);
    assert.equal(isNotNumber(true), true);
    assert.equal(isNotNumber(undefined), true);
  });
});
describe('isBoolean', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isBoolean(true), true);
    assert.equal(isBoolean(123), false);
    assert.equal(isBoolean('test'), false);
    assert.equal(isBoolean(undefined), false);
  });
});
describe('isNotBoolean', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isNotBoolean(true), false);
    assert.equal(isNotBoolean(123), true);
    assert.equal(isNotBoolean('test'), true);
    assert.equal(isNotBoolean(undefined), true);
  });
});
describe('isUndefined', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isUndefined(undefined), true);
    assert.equal(isUndefined(123), false);
    assert.equal(isUndefined('test'), false);
    assert.equal(isUndefined(true), false);
  });
});
describe('isNotUndefined', () => {
  it('should typecheck the given variable correctly', () => {
    assert.equal(isNotUndefined(undefined), false);
    assert.equal(isNotUndefined(123), true);
    assert.equal(isNotUndefined('test'), true);
    assert.equal(isNotUndefined(true), true);
  });
});

describe('isObjectPlain', () => {
  // Plain objects
  it('returns true for an empty object', () => {
    assert.strictEqual(isObjectPlain({}), true);
  });

  it('returns true for an object created with Object.create(null)', () => {
    assert.strictEqual(isObjectPlain(Object.create(null)), true);
  });

  it('returns true for an object created with new Object()', () => {
    assert.strictEqual(isObjectPlain(new Object()), true);
  });

  it('returns true for a frozen plain object', () => {
    const obj = Object.freeze({ a: 1 });
    assert.strictEqual(isObjectPlain(obj), true);
  });

  it('returns true for a sealed plain object', () => {
    const obj = Object.seal({ a: 1 });
    assert.strictEqual(isObjectPlain(obj), true);
  });

  // Non-object values
  it('returns false for null', () => {
    assert.strictEqual(isObjectPlain(null as unknown), false);
  });

  it('returns false for an array', () => {
    assert.strictEqual(isObjectPlain([]), false);
  });

  it('returns false for a function', () => {
    assert.strictEqual(isObjectPlain(() => {}), false);
  });

  it('returns false for a Date instance', () => {
    assert.strictEqual(isObjectPlain(new Date()), false);
  });

  it('returns false for a class instance', () => {
    class TestClass {}
    assert.strictEqual(isObjectPlain(new TestClass()), false);
  });

  it('returns false for Map/Set', () => {
    assert.strictEqual(isObjectPlain(new Map()), false);
    assert.strictEqual(isObjectPlain(new Set()), false);
  });

  it('returns false for RegExp', () => {
    assert.strictEqual(isObjectPlain(/re/), false);
    assert.strictEqual(isObjectPlain(new RegExp('re')), false);
  });

  it('returns false for Error', () => {
    assert.strictEqual(isObjectPlain(new Error('x')), false);
  });

  it('returns false for Promise', () => {
    assert.strictEqual(isObjectPlain(Promise.resolve(1)), false);
  });

  it('returns false for typed arrays', () => {
    assert.strictEqual(isObjectPlain(new Uint8Array(2)), false);
    assert.strictEqual(isObjectPlain(new Int16Array(2)), false);
  });

  it('returns false for boxed primitives', () => {
    assert.strictEqual(isObjectPlain(new Number(1)), false);
    assert.strictEqual(isObjectPlain(new String('a')), false);
    assert.strictEqual(isObjectPlain(new Boolean(true)), false);
    assert.strictEqual(isObjectPlain(Object(1)), false); // same as new Number(1)
  });

  // Unusual prototypes
  it('returns false for an object constructed via a custom constructor', () => {
    function CustomConstructor(this: any) {
      this.x = 1;
    }
    CustomConstructor.prototype.y = 2;
    const obj = new (CustomConstructor as any)();
    assert.strictEqual(isObjectPlain(obj), false);
  });

  it('returns false for an object with a prototype other than Object.prototype or null', () => {
    const obj = Object.create({ a: 1 });
    assert.strictEqual(isObjectPlain(obj), false);
  });

  it('returns true for null-prototype objects even with properties', () => {
    const obj = Object.create(null);
    (obj as any).x = 1;
    assert.strictEqual(isObjectPlain(obj), true);
  });

  it('returns false after changing a plain object prototype to a custom one', () => {
    const base = { a: 1 };
    const customProto = { p: true };
    Object.setPrototypeOf(base, customProto);
    assert.strictEqual(isObjectPlain(base), false);
  });

  it('returns true after setting a plain object prototype to null', () => {
    const base = { a: 1 };
    Object.setPrototypeOf(base, null);
    assert.strictEqual(isObjectPlain(base), true);
  });
})

describe('isObjectStrict', () => {
  // Test with plain objects
  it('returns true for an empty object', () => {
    assert.strictEqual(isObjectStrict({}), true);
  });

  it('returns true for an object created with Object.create(null)', () => {
    assert.strictEqual(isObjectStrict(Object.create(null)), true);
  });

  it('returns true for an object created with new Object()', () => {
    assert.strictEqual(isObjectStrict(new Object()), true);
  });

  // Test with non-object values
  it('returns false for null', () => {
    assert.strictEqual(isObjectStrict(null), false);
  });

  it('returns false for an array', () => {
    assert.strictEqual(isObjectStrict([]), false);
  });

  it('returns false for a function', () => {
    assert.strictEqual(
      isObjectStrict(() => {}),
      false
    );
  });

  it('returns false for a Date instance', () => {
    assert.strictEqual(isObjectStrict(new Date()), false);
  });

  it('returns false for a class instance', () => {
    class TestClass {}
    assert.strictEqual(isObjectStrict(new TestClass()), false);
  });

  // Test with objects having unusual prototypes
  it('returns false for an object with a modified constructor', () => {
    function CustomConstructor() {}

    const obj = new CustomConstructor();

    assert.strictEqual(isObjectStrict(obj), false);
  });

  it('returns false for an object with a prototype chain other than Object.prototype or null', () => {
    const obj = Object.create({ a: 1 });

    assert.strictEqual(isObjectStrict(obj), false);
  });
});

describe('isObjectLoose', () => {
  // Test with various object types
  it('returns true for a plain object', () => {
    assert.strictEqual(isObjectLoose({}), true);
  });

  it('returns true for an array', () => {
    assert.strictEqual(isObjectLoose([]), true);
  });

  it('returns true for a function', () => {
    assert.strictEqual(
      isObjectLoose(() => {}),
      true
    );
  });

  it('returns true for a Date instance', () => {
    assert.strictEqual(isObjectLoose(new Date()), true);
  });

  it('returns true for a class instance', () => {
    class TestClass {}
    assert.strictEqual(isObjectLoose(new TestClass()), true);
  });

  // Test with non-object values
  it('returns false for null', () => {
    assert.strictEqual(isObjectLoose(null), false);
  });

  it('returns false for a number', () => {
    assert.strictEqual(isObjectLoose(42), false);
  });

  it('returns false for a string', () => {
    assert.strictEqual(isObjectLoose('hello'), false);
  });

  it('returns false for a boolean', () => {
    assert.strictEqual(isObjectLoose(true), false);
  });
});

describe('isClass', () => {
  it('returns true for class declarations', () => {
    class MyClass {}
    assert.strictEqual(isClass(MyClass), true);
  });

  it('returns true for class expressions', () => {
    const MyClass = class {};

    assert.strictEqual(isClass(MyClass), true);
  });

  it('returns false for regular functions', () => {
    function regularFunction() {}
    assert.strictEqual(isClass(regularFunction), false);
  });

  it('returns false for arrow functions', () => {
    const arrowFunction = () => {};

    assert.strictEqual(isClass(arrowFunction), false);
  });

  it('returns false for async functions', () => {
    async function asyncFunction() {}
    assert.strictEqual(isClass(asyncFunction), false);
  });

  it('returns false for generator functions', () => {
    function* generatorFunction() {}
    assert.strictEqual(isClass(generatorFunction), false);
  });

  it('returns false for built-in functions', () => {
    assert.strictEqual(isClass(Math.max), false);
    assert.strictEqual(isClass(Date), false);
  });

  it('returns false for primitive values', () => {
    assert.strictEqual(isClass(42), false);
    assert.strictEqual(isClass('hello'), false);
    assert.strictEqual(isClass(true), false);
    assert.strictEqual(isClass(Symbol('test')), false);
    assert.strictEqual(isClass(BigInt(123)), false);
    assert.strictEqual(isClass(undefined), false);
    assert.strictEqual(isClass(null), false);
  });

  it('returns false for non-function objects', () => {
    assert.strictEqual(isClass({}), false);
    assert.strictEqual(isClass([]), false);
    assert.strictEqual(isClass(new Date()), false);
    assert.strictEqual(isClass(new Map()), false);
    assert.strictEqual(isClass(new Set()), false);
  });
});

describe('isBuiltInConstructor', () => {
  it('returns true for built-in constructors', () => {
    assert.strictEqual(isBuiltInConstructor(Object), true);
    assert.strictEqual(isBuiltInConstructor(Array), true);
    assert.strictEqual(isBuiltInConstructor(Function), true);
    assert.strictEqual(isBuiltInConstructor(String), true);
    assert.strictEqual(isBuiltInConstructor(Number), true);
    assert.strictEqual(isBuiltInConstructor(Boolean), true);
    assert.strictEqual(isBuiltInConstructor(Date), true);
    assert.strictEqual(isBuiltInConstructor(RegExp), true);
    assert.strictEqual(isBuiltInConstructor(Error), true);
    assert.strictEqual(isBuiltInConstructor(EvalError), true);
    assert.strictEqual(isBuiltInConstructor(RangeError), true);
    assert.strictEqual(isBuiltInConstructor(ReferenceError), true);
    assert.strictEqual(isBuiltInConstructor(SyntaxError), true);
    assert.strictEqual(isBuiltInConstructor(TypeError), true);
    assert.strictEqual(isBuiltInConstructor(URIError), true);
    assert.strictEqual(isBuiltInConstructor(Map), true);
    assert.strictEqual(isBuiltInConstructor(WeakMap), true);
    assert.strictEqual(isBuiltInConstructor(Set), true);
    assert.strictEqual(isBuiltInConstructor(WeakSet), true);
    assert.strictEqual(isBuiltInConstructor(Promise), true);
    assert.strictEqual(isBuiltInConstructor(BigInt), true);
    assert.strictEqual(isBuiltInConstructor(Symbol), true);
  });

  it('returns false for custom classes', () => {
    class MyClass {}
    assert.strictEqual(isBuiltInConstructor(MyClass), false);
  });

  it('returns false for function expressions', () => {
    const myFunc = function () {};

    assert.strictEqual(isBuiltInConstructor(myFunc), false);
  });

  it('returns false for arrow functions', () => {
    const arrowFunc = () => {};

    assert.strictEqual(isBuiltInConstructor(arrowFunc), false);
  });

  it('returns false for async functions', () => {
    async function asyncFunc() {}
    assert.strictEqual(isBuiltInConstructor(asyncFunc), false);
  });

  it('returns false for generator functions', () => {
    function* generatorFunc() {}
    assert.strictEqual(isBuiltInConstructor(generatorFunc), false);
  });

  it('returns false for non-function values', () => {
    assert.strictEqual(isBuiltInConstructor(null), false);
    assert.strictEqual(isBuiltInConstructor(undefined), false);
    assert.strictEqual(isBuiltInConstructor(123), false);
    assert.strictEqual(isBuiltInConstructor('hello'), false);
    assert.strictEqual(isBuiltInConstructor([]), false);
    assert.strictEqual(isBuiltInConstructor({}), false);
    assert.strictEqual(isBuiltInConstructor(new Date()), false);
  });
});

describe('isInstanceOfUnknownClass', () => {
  it('returns true for instances of custom classes', () => {
    class MyClass {}
    class AnotherClass {}

    assert.strictEqual(isInstanceOfUnknownClass(new MyClass()), true);
    assert.strictEqual(isInstanceOfUnknownClass(new AnotherClass()), true);
  });

  it('returns true for built-in object-like structures with non-standard prototypes', () => {
    assert.strictEqual(isInstanceOfUnknownClass([]), true); // Arrays have a prototype different from Object.prototype
    assert.strictEqual(isInstanceOfUnknownClass(new Date()), true);
    assert.strictEqual(isInstanceOfUnknownClass(new Map()), true);
    assert.strictEqual(isInstanceOfUnknownClass(new Set()), true);
    assert.strictEqual(isInstanceOfUnknownClass(new WeakMap()), true);
    assert.strictEqual(isInstanceOfUnknownClass(new WeakSet()), true);
    assert.strictEqual(isInstanceOfUnknownClass(new Error()), true);
  });

  it('returns false for plain objects', () => {
    assert.strictEqual(isInstanceOfUnknownClass({}), false);
  });

  it('returns false for objects created with Object.create(null)', () => {
    const nullPrototypeObject = Object.create(null);

    assert.strictEqual(isInstanceOfUnknownClass(nullPrototypeObject), false);
  });

  it('returns false for primitive values', () => {
    assert.strictEqual(isInstanceOfUnknownClass(null), false);
    assert.strictEqual(isInstanceOfUnknownClass(undefined), false);
    assert.strictEqual(isInstanceOfUnknownClass(42), false);
    assert.strictEqual(isInstanceOfUnknownClass('hello'), false);
    assert.strictEqual(isInstanceOfUnknownClass(true), false);
    assert.strictEqual(isInstanceOfUnknownClass(Symbol('test')), false);
    assert.strictEqual(isInstanceOfUnknownClass(BigInt(123)), false);
  });

  it('returns false for functions', () => {
    function regularFunction() {}
    class MyClass {}

    assert.strictEqual(isInstanceOfUnknownClass(regularFunction), false);
    assert.strictEqual(
      isInstanceOfUnknownClass(() => {}),
      false
    );
    assert.strictEqual(isInstanceOfUnknownClass(MyClass), false);
  });
});

// Property-based tests: rules that must hold for every value, checked with
// fast-check on many generated values. The seed is fixed, so every run checks
// the same values and a failure can be reproduced.
import * as fc from 'fast-check';

import { describe, it } from 'node:test';

import * as typeOf from '../main.ts';

const {
  isBoolean,
  isBuiltInCallable,
  isBuiltInConstructor,
  isClass,
  isDefined,
  isFunction,
  isNotBoolean,
  isNotNumber,
  isNotString,
  isNotUndefined,
  isNumber,
  isObjectLoose,
  isObjectPlain,
  isObjectStrict,
  isString,
  isUndefined
} = typeOf;
const SETTINGS = { seed: 20261025, numRuns: 1000 };
// Any value, including null-prototype objects, boxed values and functions
const anyValue = fc.oneof(
  fc.anything({
    withBoxedValues: true,
    withNullPrototype: true,
    withObjectString: true,
    withMap: true,
    withSet: true,
    withDate: true,
    withTypedArray: true,
    withSparseArray: true,
    withBigInt: true
  }),
  fc.func(fc.anything()),
  fc.constantFrom(
    Object,
    Array,
    Date,
    Map,
    Symbol,
    BigInt,
    class Example {},
    () => {},
    function named() {},
    async () => {},
    function* generator() {}
  )
);
const check = (property: fc.IProperty<[unknown]>) =>
  fc.assert(property, SETTINGS);

describe('properties', () => {
  it('primitive checks agree with typeof', () => {
    check(
      fc.property(anyValue, (value) => {
        return (
          isString(value) === (typeof value === 'string') &&
          isNumber(value) === (typeof value === 'number') &&
          isBoolean(value) === (typeof value === 'boolean') &&
          isUndefined(value) === (typeof value === 'undefined') &&
          isFunction(value) === (typeof value === 'function')
        );
      })
    );
  });

  it('every isNot check is the opposite of its is check', () => {
    check(
      fc.property(anyValue, (value) => {
        return (
          isNotString(value) === !isString(value) &&
          isNotNumber(value) === !isNumber(value) &&
          isNotBoolean(value) === !isBoolean(value) &&
          isNotUndefined(value) === !isUndefined(value) &&
          isDefined(value) === isNotUndefined(value)
        );
      })
    );
  });

  it('every helper returns a boolean', () => {
    check(
      fc.property(anyValue, (value) =>
        Object.values(typeOf).every(
          (helper) => typeof helper(value) === 'boolean'
        )
      )
    );
  });

  it('a plain object is a strict object, and both are loose objects', () => {
    check(
      fc.property(anyValue, (value) => {
        return (
          (!isObjectPlain(value) || isObjectStrict(value)) &&
          (!isObjectStrict(value) || isObjectLoose(value))
        );
      })
    );
  });

  it('classes and built-ins are functions', () => {
    check(
      fc.property(anyValue, (value) => {
        return (
          (!isClass(value) || isFunction(value)) &&
          (!isBuiltInConstructor(value) || isFunction(value)) &&
          (!isBuiltInCallable(value) || isFunction(value))
        );
      })
    );
  });

  it('an object parsed from JSON is plain', () => {
    check(
      fc.property(fc.dictionary(fc.string(), fc.jsonValue()), (object) => {
        const parsed = JSON.parse(JSON.stringify(object));

        return isObjectPlain(parsed) && isObjectStrict(parsed);
      })
    );
  });
});

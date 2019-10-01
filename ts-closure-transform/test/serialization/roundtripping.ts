import { expect } from 'chai';
import { serialize, deserialize } from '../../../serialize-closures/src';

function roundtrip<T>(value: T): T {
  return deserialize(serialize(value));
}

export function roundTripClosure() {
  let mul = (x, y) => x * y;
  let factorial = i => {
    if (i <= 0) {
      return 1;
    } else {
      return mul(i, factorial(i - 1));
    }
  };

  expect(roundtrip(factorial)(5)).to.equal(120);
}

export function roundTripHoistingClosure() {
  let f = x => {
    let a = 1;
    let r = curriedAdd(x);
    function curriedAdd(x) {
      a + x
    }
    return r
  };

  let out = roundtrip(f);
  expect(out(4)).to.equal(5);
}

export function roundTripNestedClosure() {
  let a = 10;
  let f = x => {
    return y => {
      return { result: a + x + y, f };
    };
  };

  let out = roundtrip(f(10))(5);
  expect(out.result).to.equal(25);
  expect(out.f(10)(5).result).to.equal(25);
}

export function roundTripMathClosure() {
  let f = x => {
    return Math.sqrt(x);
  };

  let out = roundtrip(f);
  expect(out(4)).to.equal(2);
}

export function roundTripMathFunctionClosure() {
  let sqrt = Math.sqrt;
  let f = x => {
    return sqrt(x);
  };

  let out = roundtrip(f);
  expect(out(4)).to.equal(2);
}

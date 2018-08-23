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

export function roundTripNestedClosure() {
  let a = 10;
  let f = x => {
    return y => {
      return a + x + y;
    };
  };

  expect(roundtrip(f(10))(5)).to.equal(25);
}

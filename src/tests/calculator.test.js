const { add, subtract, multiply, divide, compute } = require('../calculator');

describe('Calculator basic operations', () => {
  test('add 2 + 3 => 5', () => {
    expect(add(2, 3)).toBe(5);
  });

  test('subtract 10 - 4 => 6', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply 45 * 2 => 90', () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test('divide 20 / 5 => 4', () => {
    expect(divide(20, 5)).toBe(4);
  });
});

describe('Compute wrapper and CLI-like behavior', () => {
  test('compute add returns same as add', () => {
    expect(compute('add', 7, 8)).toBe(15);
  });

  test('compute subtract returns same as subtract', () => {
    expect(compute('subtract', 5, 2)).toBe(3);
  });

  test('compute multiply returns same as multiply', () => {
    expect(compute('multiply', 3, 3)).toBe(9);
  });

  test('compute divide returns same as divide', () => {
    expect(compute('divide', 9, 3)).toBe(3);
  });

  test('unknown operation throws', () => {
    expect(() => compute('mod', 5, 2)).toThrow(/unknown operation/);
  });
});

describe('Edge cases', () => {
  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow(/division by zero/);
  });

  test('compute divide by zero throws', () => {
    expect(() => compute('divide', 4, 0)).toThrow(/division by zero/);
  });

  test('floating point division', () => {
    expect(divide(1, 2)).toBeCloseTo(0.5);
  });

  test('large numbers', () => {
    expect(multiply(1e9, 3)).toBe(3e9);
  });
});

const { add, subtract, multiply, divide, compute, modulo, power, squareRoot } = require('../calculator');

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

  test('modulo 5 % 2 => 1', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('power 2 ^ 3 => 8', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('squareRoot sqrt(16) => 4', () => {
    expect(squareRoot(16)).toBe(4);
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

  test('compute mod returns same as modulo', () => {
    expect(compute('mod', 5, 2)).toBe(1);
    expect(compute('modulo', 7, 3)).toBe(1);
  });

  test('compute pow returns same as power', () => {
    expect(compute('pow', 2, 8)).toBe(256);
    expect(compute('power', 2, -1)).toBeCloseTo(0.5);
  });

  test('compute sqrt returns same as squareRoot', () => {
    expect(compute('sqrt', 25)).toBe(5);
    expect(compute('squareRoot', 9)).toBe(3);
  });

  test('unknown operation throws', () => {
    expect(() => compute('unknown-op', 5, 2)).toThrow(/unknown operation/);
  });
});

describe('Edge cases', () => {
  test('division by zero throws', () => {
    expect(() => divide(1, 0)).toThrow(/division by zero/);
  });

  test('compute divide by zero throws', () => {
    expect(() => compute('divide', 4, 0)).toThrow(/division by zero/);
  });

  test('modulo by zero throws', () => {
    expect(() => modulo(4, 0)).toThrow(/modulo by zero/);
    expect(() => compute('mod', 4, 0)).toThrow(/modulo by zero/);
  });

  test('square root of negative throws', () => {
    expect(() => squareRoot(-9)).toThrow(/square root of negative number/);
    expect(() => compute('sqrt', -1)).toThrow(/square root of negative number/);
  });

  test('floating point division', () => {
    expect(divide(1, 2)).toBeCloseTo(0.5);
  });

  test('large numbers', () => {
    expect(multiply(1e9, 3)).toBe(3e9);
  });
});

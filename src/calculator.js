#!/usr/bin/env node

// CLI Calculator
// Supported operations (exported functions):
// - add:         addition       (a + b)
// - subtract:    subtraction    (a - b)
// - multiply:    multiplication (a * b)
// - divide:      division       (a / b) -- throws on division by zero
// - modulo:      remainder      (a % b) -- throws on modulo by zero
// - power:       exponentiation (base ** exponent)
// - squareRoot:  square root    (sqrt(n)) -- throws on negative input
//
// The file also provides a CLI wrapper so it can be used as:
// node src/calculator.js add 2 3
// node src/calculator.js pow 2 8
// node src/calculator.js sqrt 9

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2?>');
  console.error('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
  console.error('Note: sqrt only needs a single operand (num1).');
}

function toNumber(str) {
  const n = Number(str);
  return Number.isFinite(n) ? n : NaN;
}

// Arithmetic functions exported for unit testing
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  // Use Math.pow for clarity; handles non-integer exponents
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}

function compute(operation, a, b) {
  switch (operation) {
    case 'add':
      return add(a, b);
    case 'subtract':
      return subtract(a, b);
    case 'multiply':
      return multiply(a, b);
    case 'divide':
      return divide(a, b);
    case 'mod':
    case 'modulo':
      return modulo(a, b);
    case 'pow':
    case 'power':
      return power(a, b);
    case 'sqrt':
    case 'squareRoot':
      return squareRoot(a);
    default:
      throw new Error(`unknown operation: ${operation}`);
  }
}

function main(argv) {
  const operation = argv[2];
  if (!operation) {
    printUsage();
    process.exit(2);
  }

  const needsTwoOperands = !['sqrt', 'squareRoot'].includes(operation);

  if (needsTwoOperands && argv.length < 5) {
    printUsage();
    process.exit(2);
  }

  if (!needsTwoOperands && argv.length < 4) {
    printUsage();
    process.exit(2);
  }

  const aStr = argv[3];
  const bStr = argv[4];

  const a = toNumber(aStr);
  const b = needsTwoOperands ? toNumber(bStr) : undefined;

  if (Number.isNaN(a) || (needsTwoOperands && Number.isNaN(b))) {
    console.error('Error: operand(s) must be valid numbers.');
    printUsage();
    process.exit(3);
  }

  try {
    const result = compute(operation, a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message || err);
    if (err.message && (err.message.includes('division by zero') || err.message.includes('modulo by zero'))) {
      process.exit(4);
    }
    process.exit(2);
  }
}

// Export functions for testing
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  modulo,
  power,
  squareRoot,
  compute,
};

if (require.main === module) {
  main(process.argv);
}

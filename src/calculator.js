#!/usr/bin/env node

// CLI Calculator
// Supported operations (exported functions):
// - add:       addition       (a + b)
// - subtract:  subtraction    (a - b)
// - multiply:  multiplication (a * b)
// - divide:    division       (a / b) -- throws on division by zero
//
// The file also provides a CLI wrapper so it can be used as:
// node src/calculator.js add 2 3

function printUsage() {
  console.error('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.error('Operations: add, subtract, multiply, divide');
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
    default:
      throw new Error(`unknown operation: ${operation}`);
  }
}

function main(argv) {
  if (argv.length < 5) {
    printUsage();
    process.exit(2);
  }

  const operation = argv[2];
  const aStr = argv[3];
  const bStr = argv[4];

  const a = toNumber(aStr);
  const b = toNumber(bStr);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    printUsage();
    process.exit(3);
  }

  try {
    const result = compute(operation, a, b);
    console.log(result);
  } catch (err) {
    console.error('Error:', err.message || err);
    if (err.message && err.message.includes('division by zero')) {
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
  compute,
};

if (require.main === module) {
  main(process.argv);
}

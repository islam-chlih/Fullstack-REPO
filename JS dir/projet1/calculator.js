// -------------------
// Calculator State
// -------------------
const state = {
  current: '0',       // current input
  previous: null,     // previous value
  operator: null,     // current operator
  overwrite: false    // should next digit overwrite current
};
history = [];

// -------------------
// DOM Elements
// -------------------
const displayEl = document.getElementById('display');
const keysEl = document.getElementById('keys');

// -------------------
// Pure arithmetic functions
// -------------------
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b === 0 ? 'Error' : a / b; }

function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return add(a, b);
    case '-': return subtract(a, b);
    case '*': return multiply(a, b);
    case '/': return divide(a, b);
    default: return b;
  }
}

// -------------------
// Update display
// -------------------
function updateDisplay() {
  displayEl.textContent = state.current.length > 12 
    ? parseFloat(state.current).toExponential(6)
    : state.current;
}

// -------------------
// Handlers
// -------------------
function inputDigit(digit) {
    console.log(state.overwrite);
    
  if (state.overwrite || state.current === '0') {
    state.current = digit;
    state.overwrite = false;
  } else {
    state.current += digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (!state.current.includes('.')) {
    state.current += '.';
  }
  updateDisplay();
}

function egale(prev, curr, op){
    state.current = operate(prev, curr, op).toString();
}

function chooseOperator(op) {
  if (state.operator && !state.overwrite) {
    // compute intermediate result
    egale(state.previous, state.current, state.operator);
  }
  state.previous = state.current;
  state.operator = op;
  state.overwrite = true;
  updateDisplay();
}

function evaluate() {
  if (state.operator && state.previous !== null) {
    egale(state.previous, state.current, state.operator);
    state.previous = null;
    state.operator = null;
    state.overwrite = true;
    updateDisplay();
  }
}

function handleCommand(cmd) {
  switch (cmd) {
    case 'AC':
      state.current = '0';
      state.previous = null;
      state.operator = null;
      state.overwrite = false;
      break;
    case 'CE':
      state.current = '0';
      state.overwrite = false;
      break;
    case 'neg':
      state.current = state.current.startsWith('-') 
        ? state.current.slice(1) 
        : '-' + state.current;
      break;
    case 'pct':
      state.current = (parseFloat(state.current) / 100).toString();
      break;
  }
  updateDisplay();
}

// -------------------
// Event Delegation
// -------------------
keysEl.addEventListener('click', (e) => {
  const button = e.target.closest('button');
  if (!button) return;

  const type = button.dataset.type;
  const value = button.dataset.value;

  switch(type) {
    case 'digit':
      value === '.' ? inputDecimal() : inputDigit(value);
      break;
    case 'op':
      chooseOperator(value);
      break;
    case 'eq':
      evaluate();
      break;
    case 'cmd':
      handleCommand(value);
      break;
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  if (e.key === '.') inputDecimal();
  if (['+', '-', '*', '/'].includes(e.key)) chooseOperator(e.key);
  if (e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') handleCommand('CE');
  if (e.key === 'Escape') handleCommand('AC');
});
 
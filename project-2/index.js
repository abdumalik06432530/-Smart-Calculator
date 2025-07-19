const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let input = '';

function updateDisplay() {
  display.textContent = input || '0';
}

function evaluateExpression() {
  try {
    // Avoid eval on invalid input
    const result = eval(input);
    input = result.toString();
    updateDisplay();
  } catch (error) {
    display.textContent = 'Error';
  }
}

function handleInput(key) {
  if (key === 'C') {
    input = '';
  } else if (key === '=' || key === 'Enter') {
    evaluateExpression();
    return;
  } else if (key === 'Backspace') {
    input = input.slice(0, -1);
  } else if (/[\d.+\-*/]/.test(key)) {
    // Prevent two operators in a row (like ++, **, etc.)
    const lastChar = input.slice(-1);
    if (/[\+\-\*/]/.test(lastChar) && /[\+\-\*/]/.test(key)) return;
    input += key;
  }

  updateDisplay();
}


buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.getAttribute('data-key');
    handleInput(key);
  });
});

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if ('0123456789+-*/.=EnterBackspacecC'.includes(key)) {
    handleInput(key);
  }
});

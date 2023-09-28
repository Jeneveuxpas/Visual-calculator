const { JSDOM } = require('jsdom');
const jsDomInstance = new JSDOM(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>简单计算器</title>
    <link rel="stylesheet" href="calculator.css">
</head>
<body>
    <div class="calculator">
        <input type="text" id="display" onkeydown="check()" >
        <input type="text" id="display2" readonly >
        <div class="buttons">
		<button onclick="appendToDisplay('sin(')">sin</button>		
		<button onclick="appendToDisplay('lg(')">lg</button>
		<button onclick="appendToDisplay('ln(')">ln</button>
		<button onclick="appendToDisplay('(')">(</button>
		<button onclick="appendToDisplay(')')">)</button>
		<br>
		<button onclick="appendToDisplay('cos(')">cos</button>
		<button onclick="clearDisplay()">AC</button>
		<button onclick="delToDisplay()">del</button>
		<button onclick="appendToDisplay('%')">%</button>
		<button onclick="appendToDisplay('/')">/</button>
		<br>	
		<button onclick="appendToDisplay('tan(')">tan</button>
		<button onclick="appendToDisplay('7')">7</button>
		<button onclick="appendToDisplay('8')">8</button>
		<button onclick="appendToDisplay('9')">9</button>
		<button onclick="appendToDisplay('*')">*</button>
		<br>
		<button onclick="appendToDisplay('^')">^</button>
		<button onclick="appendToDisplay('4')">4</button>
		<button onclick="appendToDisplay('5')">5</button>
		<button onclick="appendToDisplay('6')">6</button>
		<button onclick="appendToDisplay('-')">-</button>
		<br>
		<button onclick="appendToDisplay('sqrt(')">sqrt</button>
		<button onclick="appendToDisplay('1')">1</button>
		<button onclick="appendToDisplay('2')">2</button>
		<button onclick="appendToDisplay('3')">3</button>
		<button onclick="appendToDisplay('+')">+</button>
		<br>
		<button onclick="appendToDisplay('pi')">π</button>
		<button onclick="appendToDisplay('e')">e</button>
		<button onclick="appendToDisplay('0')">0</button>
		<button onclick="appendToDisplay('.')">.</button>
		<button onclick="calculateResult()">=</button>
			</div>
    </div>
    <script src="calculator.js"></script>
</body>
</html>

`);

const window = jsDomInstance.window;
const document = window.document;
global.document = document;

const {
  calculateResult,
  clearDisplay,
  appendToDisplay,
  delToDisplay,
} = require('./calculator');

// Mock the display elements
document.body.innerHTML = `
  <input type="text" id="display">
  <input type="text" id="display2" readonly>
`;

describe('Calculator Functions', () => {
  beforeEach(() => {
    document.getElementById('display').value = '';
    document.getElementById('display2').value = '';
  });

  test('appendToDisplay should append values to the display', () => {
    appendToDisplay('5');
    expect(document.getElementById('display').value).toBe('5');
  });

  test('appendToDisplay should append values to the display', () => {
    appendToDisplay('5');
    appendToDisplay('6');
    appendToDisplay('+')
    expect(document.getElementById('display').value).toBe('56+');
  });

  test('clearDisplay should clear the display', () => {
    document.getElementById('display').value = '123';
    clearDisplay();
    expect(document.getElementById('display').value).toBe('');
    expect(document.getElementById('display2').value).toBe('');
  });

  test('delToDisplay should delete the last character from the display', () => {
    document.getElementById('display').value = '123';
    delToDisplay();
    expect(document.getElementById('display').value).toBe('12');
  });

  test('delToDisplay should delete the last character from the display', () => {
    document.getElementById('display').value = '123+67-9';
    delToDisplay();
    delToDisplay();
    expect(document.getElementById('display').value).toBe('123+67');
  });

  test('calculateResult should calculate the result correctly', () => {
    document.getElementById('display').value = '2+2';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('4');
  });

  test('calculateResult should handle invalid expressions', () => {
    document.getElementById('display').value = '2+';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('error');
  });

  test('calculateResult should handle invalid expressions', () => {
    document.getElementById('display').value = '1/0';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('error');
  });

  test('calculateResult should handle invalid expressions', () => {
    document.getElementById('display').value = '0.0/0';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('error');
  });

  test('calculateResult should handle invalid expressions', () => {
    document.getElementById('display').value = '10^1000';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('error');
  });

  test('', () => {
    document.getElementById('display').value = '123+sin(';
    appendToDisplay('1');
    appendToDisplay(')')
    calculateResult();
    expect(document.getElementById('display2').value).toBe('123.8414709848');
  });

  test('', () => {
    document.getElementById('display').value = '0.1+0.2';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('0.3');
  });

  test('', () => {
    document.getElementById('display').value = '0.198600';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('0.1986');
  });

  test('', () => {
    document.getElementById('display').value = 'lg(10)+tan(2)+2^-2';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('-0.9350398633');
  });

  test('', () => {
    document.getElementById('display').value = 'ln(e)+2^-1+sin(1)-cos(1)+sqrt(4)';
    calculateResult();
    expect(document.getElementById('display2').value).toBe('3.8011686789');
  });
  
});

describe('Keyboard Input', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="display">
      <input type="text" id="display2" readonly>
    `;
    document.getElementById('display').value = '';
    document.getElementById('display2').value = '';
  });

  test('Pressing Enter key calls calculateResult', () => {
    const calculateResultMock = jest.fn();
    document.addEventListener('keydown', calculateResultMock);
    
    // Simulate Enter key press
    const enterKeyEvent = new window.KeyboardEvent('keydown', { key: 'Enter' });
    document.dispatchEvent(enterKeyEvent);

    expect(calculateResultMock).toHaveBeenCalledTimes(1);
  });

  test('Pressing Escape key calls clearDisplay', () => {
    const clearDisplayMock = jest.fn();
    document.addEventListener('keydown', clearDisplayMock);
    
    // Simulate Escape key press
    const escapeKeyEvent = new window.KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeKeyEvent);

    expect(clearDisplayMock).toHaveBeenCalledTimes(1);
  });
});
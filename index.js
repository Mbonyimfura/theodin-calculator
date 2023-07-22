const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');
let operand1 = '';
let operand2 = '';
let operator = '';

function clear() {
    operand1 = '';
    operand2 = '';
    operator = '';
    display.value = '';
}

function calculate() {
    const num1 = parseFloat(operand1);
    const num2 = parseFloat(operand2);
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case 'x':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return NaN;
    }
}

buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); 
        const value = this.innerText;
        if (!isNaN(parseFloat(value))) {
            if (!operator) {
                operand1 += value;
            } else {
                operand2 += value;
            }
            display.value += value;
        } else if (value === '+' || value === '-' || value === 'x' || value === '/') {
            if (operand1 && !operand2) {
                operator = value;
                display.value += ` ${value} `;
            }
        } else if (value === 'C') {
            clear();
        } else if (value === '=') {
            if (operand1 && operator && operand2) {
                const result = calculate();
                display.value = result;
                operand1 = result;
                operand2 = '';
                operator = '';
            }
            
        }
        else if (value === '.') {
            if (!display.value.includes('.')) {
                if (!operator) {
                    operand1 += value;
                } else {
                    operand2 += value;
                }
                display.value += value;
            }
        }
    });
});

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
        case '%':
            return num1%num2;
        default:
            return NaN;
    }
}
function handlePlusMinus() {
    if (!operator) {
        if (operand1 !== '' && operand1 !== '-') {
            operand1 = (parseFloat(operand1) * -1).toString();
            display.value = operand1;
        }
    } else {
        if (operand2 !== '' && operand2 !== '-') {
            operand2 = (parseFloat(operand2) * -1).toString();
            display.value = operand2;
        }
    }
}
buttons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault(); 
        const value = this.innerText;
     
        if (!isNaN(parseFloat(value))) {
            if (!operator) {
                if (operand1 === '0') {
                    operand1 = value;
                    display.value = value;
                } else {
                    operand1 += value;
                    display.value += value;
                }
            } else {
                if (operand2 === '0') {
                    operand2 = value;
                    display.value += value;
                } else {
                    operand2 += value;
                    display.value += value;
                }
            }
        } else if (value === '+' || value === '-' || value === 'x' || value === '/') {
            if (operand1 && !operand2) {
                operator = value;
                display.value += ` ${value} `;
            }
        }
        else if (value === '%') {
            if (operand1 && !operator && !operand2) {
                operand1 = parseFloat(operand1) / 100;
                display.value = operand1;
            }
        } 
        else if (value === '.') {
            if (!operator) {
                if (!operand1.includes('.')) {
                    if (operand1 === '' || operand1 === '-'){
                        operand1 += '0';
                        display.value += '0';
                    }
                    operand1 += value;
                    display.value += value;
                }
            } else {
                if (!operand2.includes('.')) {
                    if (operand2 === '' || operand2 === '-'){
                        operand2 += '0';
                        display.value += '0';
                    }
                    operand2 += value;
                    display.value += value;
                }
            }
        }
         else if (value === 'C') {
            clear();
        }
         else if (value === '=') {
            if (operand1 && operator && operand2) {
                const result = calculate();
                display.value = result;
                operand1 = result;
                operand2 = '';
                operator = '';
            }
            
        }
        else if (value === '+/-') {
            handlePlusMinus();
        }
        else if(value==='DEL'){
         if(!operator){
            operand1=operand1.slice(0,-1)
            display.value=operand1
         }else if(operand2){
            operand2=operand2.slice(0,-1)
            display.value=display.value.slice(0,-1)
         }else if(operator&&!operand2){
            operator='';
            display.value = display.value.slice(0, -3); 
         }


        }
      
        
    });
});

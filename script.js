function add(a,b){
    return a + b;
}

function subtract(a,b) {
    return a - b;
}

function multiply (a,b) {
    return a * b;
}

function divide(a,b) {
    if (b === 0){
        return "Error, division by zero.";
    }
    return a / b;
}

let firstNumber = null;
let secondNumber= null;
let operator = null;
let displayContent = "";

function operate(operator,firstNumber, secondNumber) {
    switch(operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber)
        case '*':
            return multiply(firstNumber, secondNumber)
        case '/':
            return divide(firstNumber, secondNumber);
        default:
            return "Error! Invalid Operator"
    }
}

function updateDisplay() {
    document.querySelector('#display').value = displayContent;
}

function addDigit(digit) {
    displayContent += digit.toString();
    updateDisplay()
}

function clearDisplay() {
    displayContent = "";
    firstNumber = null;
    secondNumber = null;
    operator = null;
    updateDisplay()
}
function handleOperator(selectedOperator){
    if (displayContent === "") return;
    
    if (operator === null) {
        firstNumber =  parseFloat(displayContent);
    }else {
        secondNumber = parseFloat(displayContent);
        firstNumber = operate(operator,firstNumber,secondNumber)
        displayContent = firstNumber.toString();
    }
    displayContent = "";
    operator = selectedOperator;
    updateDisplay();
}
function calculateResult() {
    if (displayContent === "" || operator === null) return;
    secondNumber = parseFloat(displayContent);
    const result = operate(operator, firstNumber, secondNumber);
    displayContent = result.toString();
    operator = null;
    updateDisplay();
}

document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = button.textContent;

        if(buttonText === 'C') {
            clearDisplay();
        } else if(buttonText === '←') {
            backspace();
        }else if(['+', '-', '*', '/'].includes(buttonText)) {
            handleOperator(buttonText);
        } else if(buttonText === '=') {
            calculateResult();
        } else if(buttonText === '.') {
            if(!displayContent.includes('.')){
                addDigit(buttonText)
            }
        } else {
            addDigit(buttonText);
        }
    });
});

function checkDecimalPoint() {
    const decimalButton = document.querySelector('.button.decimal');
    decimalButton.disabled = displayContent.includes('.');
}

function backspace() {
    displayContent = displayContent.slice(0, -1);
    updateDisplay()
}
function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 !== 0)
        return num1 / num2;
    else
        return Infinity;
}

function rational(num1, num2) {
    if (num2 !== 0)
        return num1 % num2;
    else
        return Infinity;
}

function operate(num1, num2, operand) {
    switch (operand) {
        case '+':
            return add(num1, num2);
            break;
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        case '%':
            return rational(num1, num2);
    }
}

function isPointExisted(str)
{
    for (let i = 0; i < str.length; ++i)
    {
        if (str[i] == '.')
            return true;
    }
    return false;
}

let operator1 = undefined;
let operator2 = undefined;
let operand = null;
let shouldClearResultDisplay = true;

function clear() {
    operator1 = undefined;
    operator2 = undefined;
    operand = null;
    document.querySelector('.result').textContent = '0';
    shouldClearResultDisplay = true;
}



const operatorButtons = document.querySelectorAll('.operator-btn');
operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const resultDisplay = document.querySelector('.result');
        if (resultDisplay.textContent.length == 29) return;
        if (shouldClearResultDisplay == true)
            resultDisplay.textContent = '';
        resultDisplay.textContent += button.id;
        shouldClearResultDisplay = false;
    })
})

const operandButtons = document.querySelectorAll('.operand-btn');
operandButtons.forEach((button) => {
    button.addEventListener('click', () => {
        shouldClearResultDisplay = true;
        const resultDisplay = document.querySelector('.result');
        if (resultDisplay.textContent == '0' && button.id == '-')
        {
            resultDisplay.textContent = '-';
            shouldClearResultDisplay = false;
        }
        else if (operator1 == undefined) {
            operator1 = Number(resultDisplay.textContent);
            operand = button.id;
        }
        else if (operator2 == undefined) {
            operator2 = Number(resultDisplay.textContent);
            operator1  = operate(operator1, operator2, operand);
            resultDisplay.textContent = operator1;
            operand = button.id;
            operator2 = undefined;
        }
    })
});

document.querySelector('.clear-btn').addEventListener('click', () => {
    clear();
})

document.querySelector('.equal-btn').addEventListener('click', () => {
    const resultDisplay = document.querySelector('.result');
    operator2 = Number(resultDisplay.textContent);
    operator1 = operate(operator1, operator2, operand);
    resultDisplay.textContent = operator1;
    operator2 = undefined;
    operator1 = undefined;
    shouldClearResultDisplay = true; 
})

document.querySelector('.point-btn').addEventListener('click', () => 
{
    const resultDisplay = document.querySelector('.result');
    if (!isPointExisted(resultDisplay.textContent))
        resultDisplay.textContent += '.';
    shouldClearResultDisplay = false;
})
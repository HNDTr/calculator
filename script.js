let numOne = '';
let operator = '';
let numTwo = '';

window.addEventListener('keydown', (e)=> {
    let key = document.querySelector(`.${e.code}`)
    key.click();
})


function operate(operator, numOne, numTwo){
    switch(operator){
        case 'add':
            return add(numOne, numTwo);
        case 'subtract':
            return subtract(numOne, numTwo);
        case 'divide':
            return divide(numOne, numTwo);
        case 'multiply':
            return multiply(numOne, numTwo);
    }
}

function add(numOne, numTwo){
    return numOne + numTwo;
}

function subtract(numOne, numTwo){
    return numOne - numTwo;
}

function multiply(numOne, numTwo){
    return numOne * numTwo;
}

function divide(numOne, numTwo){
    return numTwo !== 0 ? numOne / numTwo : 'Error';
}


let operands = document.querySelectorAll('.operand');
let current = document.querySelector('.current');
operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        if (!operator){
            if (numOne === ''){
                numOne = operand.textContent;
            } else {
                numOne += operand.textContent;
            }
            current.textContent = numOne;
        } else {
            if (numTwo === ''){
                numTwo = operand.textContent;
            } else {
                numTwo += operand.textContent;
            }
            current.textContent = numTwo;
        }
    })
})

let decimalButton = document.querySelector('.decimal');
decimalButton.addEventListener('click', () => {
    if (!operator) {
        // Handling decimal for first number
        if (!numOne.includes('.')) {
            if (numOne === '') {
                numOne = '0.';
            } else {
                numOne += '.';
            }
            current.textContent = numOne;
        }
    } else {
        // Handling decimal for second number
        if (!numTwo.includes('.')) {
            if (numTwo === '') {
                numTwo = '0.';
            } else {
                numTwo += '.';
            }
            current.textContent = numTwo;
        }
    }
});


let backspace = document.querySelector('.backspace');
backspace.addEventListener('click', () => {
    if (!operator) {
        if (numOne !== '') {
            numOne = numOne.substring(0, numOne.length - 1)
            current.textContent = numOne === '' ? '0' : numOne;
        } else{
            current.textContent = '0';
        }
    } else {
        
        if (numTwo !== '') {
            numTwo = numTwo.substring(0, numTwo.length - 1)
            current.textContent = numTwo === '' ? '0' : numTwo;
        } else{
            current.textContent = '0';
            
        }
    }
})


let operators = document.querySelectorAll('.operator');
operators.forEach((operatorElement) => {
    operatorElement.addEventListener('click', (e) => {
        let operation = e.target;

        let numberOne = parseFloat(numOne);
        let numberTwo = parseFloat(numTwo);

        if((numOne && !numTwo && operation.id !== 'equal')){
            operator = operation.id;
            return;
        } 

        if (numOne && numTwo && operator ){
            let result = operate(operator, numberOne, numberTwo);
            result = Math.round(result * 100.0) / 100.0;
            if (result !== 'Error'){
                numOne = result.toString();
                operator = '';
                numTwo = '';
                current.textContent = result;
            } else{
                current.textContent = result;
            }
            if (operation.id !== 'equal'){
                operator = operation.id;
            }
        }
    })
})

let clearAllButton = document.querySelector('.clear');
clearAllButton.addEventListener('click', () => {
    numOne = '';
    operator = '';
    numTwo = '';
    current.textContent = 0;
})



const listOfOperators = ["+", "−", "×", "÷"];

const add = function(a, b) {
    return Number(a) + Number(b);
};

const subtract = function(a, b) {
    return Number(a) - Number(b);
};

const multiply = function(a, b) {
    return Number(a) * Number(b);
};

const divide = function(a, b) {
    return Number(a) / Number(b);
};

const operate = function(num1, operator, num2) {
    if (operator === "÷" && Number(num2) === 0) return "NO!";
    let res;
    switch (operator) {
        case "+":
            res = add(num1, num2);
            break;
        case "−":
            res = subtract(num1, num2);
            break;
        case "×":
            res = multiply(num1, num2);
            break;
        case "÷":
            res = divide(num1, num2);
            break;
    }
    return Math.round(res * 1000) / 1000;
};

const findOperator = function(string) {
    for (let char of string.split("")) {
        if (listOfOperators.includes(char)) return true;
    }
    return false;
};

let display = document.querySelector("#display-text");
let buttons = document.querySelectorAll(".button");

let firstNum = 0;
let operator = "";
let secondNum = 0;

const populateDisplay = function(input) {
    let displayText = display.textContent
    //if input is an operator
    if (findOperator(input)) {
        if (findOperator(displayText)) {
            if (typeof(Number(displayText.at(-1))) === "number" || displayText.at(-1) === ".") {
                display.textContent = operate(firstNum, operator, secondNum) + input;
                firstNum = operate(firstNum, operator, secondNum);
                secondNum = 0;
            } else {
                display.textContent = displayText.slice(0,displayText.length - 1) + input;
            }
        } else if (displayText != "") {
        display.textContent += input;
        }
        operator = input;
    } else if (input === ".") {
        if (findOperator(displayText)) {
            if (!(secondNum.toString().split("").includes("."))) {
                secondNum = secondNum + input;
                display.textContent += input;
            }
        } else {
            if (!(firstNum.toString().split("").includes("."))) {
                firstNum = firstNum + input;
                display.textContent += input;
            }
        }
    } else {
        display.textContent += input;
        if (findOperator(displayText)) {
            secondNum = secondNum + input;
        } else {
            firstNum = firstNum + input;
        }
    }
    console.log([firstNum, operator, secondNum]);
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        populateDisplay(button.textContent);
    });
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
    display.textContent = "";
    firstNum = 0;
    operator = "";
    secondNum = 0;
});

const equalButton = document.querySelector("#equals");

equalButton.addEventListener("click", () =>{
    let result = operate(firstNum, operator, secondNum);
    if (result != undefined && result != NaN) {
        display.textContent = result;
        firstNum = result;
        operator = "";
        secondNum = 0;
    }
});

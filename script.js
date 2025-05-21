const listOfOperators = ["+", "−", "×", "÷"];

const listOfKeyboardKeys= [
    "1", "2", "3", "4", "5", "6", "7", "8", "9", "0","." , "+"
];

const listOfSpecialKeys = [
    "-", "*", "/",
];

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
    return Math.round(res * (10 ** 5)) / (10 ** 5);
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
    let displayText = display.textContent;
    if (displayText.length >= 9) return;
    if (displayText === "NO!") {
        display.textContent = "0";
        firstNum = 0;
    }
    if (input == "0" && displayText == "0") {
        display.textContent = "0";
    } else if (display.classList.contains("display-result") && !(findOperator(input))) {
        display.textContent = "";
        display.classList.remove("display-result");
    } else if (display.classList.contains("display-result") && findOperator(input)) {
        display.classList.remove("display-result");
    }
    if (findOperator(input)) {
        if (findOperator(displayText)) {
            if (typeof(Number(displayText.at(-1))) === "number" || displayText.at(-1) === ".") {
                display.textContent = operate(firstNum, operator, secondNum) + input;
                firstNum = operate(firstNum, operator, secondNum);
                secondNum = 0;
                equalButton.classList.toggle("ready");
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
    } else if (displayText == "0" && input == "0") {
        display.textContent = input;
        display.classList.add("display-result");
    } else {
        display.textContent += input;
        if (findOperator(displayText)) {
            secondNum = secondNum + input;
            equalButton.classList.add("ready");
        } else {
            firstNum = firstNum + input;
        }
    }
};

buttons.forEach((button) => {
    button.addEventListener("click", () => {
        populateDisplay(button.textContent);
    });
    button.addEventListener("keydown", (e) => {
        let input = e.key;
        console.log(input);
        if (listOfKeyboardKeys.includes(input)) {
            if (typeof(Number(input)) === "number" || input === "." || input === "+"){
                populateDisplay(input);
            } else {
                switch (input) {
                    case "-":
                        populateDisplay("−");
                        break;
                    case "*":
                        populateDisplay("×");
                        break;
                    case "/":
                        populateDisplay("÷");
                        break;
                }
            }
        }
    });
});

const clearButton = document.querySelector("#clear");

clearButton.addEventListener("click", () => {
    display.textContent = "0";
    firstNum = 0;
    operator = "";
    secondNum = 0;
    equalButton.classList.remove("ready");
    display.classList.add("display-result");
});

clearButton.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
       display.textContent = "0";
        firstNum = 0;
        operator = "";
        secondNum = 0;
        equalButton.classList.remove("ready");
        display.classList.add("display-result"); 
    }
});

const equalButton = document.querySelector("#equals");

equalButton.addEventListener("click", () =>{
    let result = operate(firstNum, operator, secondNum);
    if (equalButton.classList.contains("ready")) {
        display.textContent = result;
        firstNum = result;
        operator = "";
        secondNum = 0;
        equalButton.classList.toggle("ready");
        display.classList.add("display-result");
    }
});

equalButton.addEventListener("keydown", (e) => {
    let result = operate(firstNum, operator, secondNum);
    if (equalButton.classList.contains("ready") && e.key === "=") {
        display.textContent = result;
        firstNum = result;
        operator = "";
        secondNum = 0;
        equalButton.classList.toggle("ready");
        display.classList.add("display-result");
    }
});

document.addEventListener("keydown", (e) => {
    let result = operate(firstNum, operator, secondNum);
    let input = e.key;
    if (listOfKeyboardKeys.includes(input)) {
        populateDisplay(input);
    } else if (listOfSpecialKeys.includes(input)) {
            switch (input) {
                case "-":
                    populateDisplay("−");
                    break;
                case "*":
                    populateDisplay("×");
                    break;
                case "/":
                    populateDisplay("÷");
                    break;
            }
    } else if (e.key === "Escape") {
        display.textContent = "0";
        firstNum = 0;
        operator = "";
        secondNum = 0;
        equalButton.classList.remove("ready");
        display.classList.add("display-result"); 
    } else if (equalButton.classList.contains("ready") && (e.key === "=" || e.key === "Enter")) {
        display.textContent = result;
        firstNum = result;
        operator = "";
        secondNum = 0;
        equalButton.classList.toggle("ready");
        display.classList.add("display-result");
    };
});

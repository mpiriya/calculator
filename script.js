let val1 = 0, val2 = 0, val3 = 0;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}


// dividend / divisor
function divide(dividend, divisor) {
    //check for divisor = 0
    if(divisor == 0) {
        return "Error";
    }
    return Math.round(dividend / divisor * 100000000) / 100000000;
}

function operate(operator, a, b) {
    if(operator == "add") {
        return add(a, b);
    }
    if(operator == "subtract") {
        return subtract(a, b);
    }
    if(operator == "multiply") {
        return multiply(a, b);
    }
    if(operator == "divide") {
        return divide(a, b);
    }
}

function display(num) {
    const disp = document.querySelector("input");
    if(disp.value.length == 9 || (disp.value.length == 10 && disp.value.indexOf(".") != -1)) {
        return;
    }
    if(disp.value == "0") {
        disp.value = num.toString();
    } else {
        disp.value += num.toString();
    }
}



window.onload = () => {
    const numButtons = document.querySelectorAll(".number");
    for(let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener('click', () => {
            display(+numButtons[i].getAttribute("id"));
        });
    }
    document.querySelector("input").value = "0";
    const clear = document.querySelector("#clear");
    clear.addEventListener('click', () => {
        document.querySelector("input").value = "0";
    });
}
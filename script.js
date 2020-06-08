let vals = [0, 0, 0];
let index = 0;

let op1 = "", op2 = "";
let disp;

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
    if(disp.value.length == 9 || (disp.value.length == 10 && disp.value.indexOf(".") != -1) || (disp.value.indexOf(".") != -1 && num == ".")) {
        return;
    }
    if(disp.value == "0" && num != ".") {
        disp.value = num;
    } else {
        disp.value += num;
    }
}


function setupOperators() {
    const ops = document.querySelectorAll(".operator");
    for(let i = 0; i < ops.length; i++) {
        ops[i].addEventListener('click', () => {
            op1 == "" ? op1 = ops[i].getAttribute("id") : op2 = ops[i].getAttribute("id");
            if(vals[index] == 0) {
                vals[index++] = +(document.querySelector("input").value);
                document.querySelector("input").value = "0";
            }
            if(index == 2 && op2 != "") {
                if(op2 == "multiply" || op2 == "divide") {
                   index = 1;
                   vals = [vals[0], operate(op2, vals[index], vals[index + 1]), 0];
                   op2 = "";
                } else {
                    index = 1;
                    vals = [operate(op1, vals[0], vals[index]), vals[index + 1], 0];
                    op1 = op2;
                }
            }
        });
    }

    // const opKeys = ["*", "-", "+", "/"]

    // document.addEventListener('keydown', event => {
    //    if(opKeys.indexOf(event.key) != -1) {
    //        switch(event.key) {
    //             case opKeys[0]:

    //        }
    //    }
    // });
}

window.onload = () => {
    disp = document.querySelector("input");

    const numButtons = document.querySelectorAll(".number");
    for(let i = 0; i < numButtons.length; i++) {
        numButtons[i].addEventListener('click', () => {
            display(numButtons[i].getAttribute("id"));
        });
    }

    document.addEventListener('keydown', event => {
        if(!isNaN(+event.key) && (+event.key >= 0 && +event.key <= 9)) {
            display(event.key);
        }
    });


    document.querySelector("input").value = "0";
    const clear = document.querySelector("#clear");
    clear.addEventListener('click', () => {
        document.querySelector("input").value = "0";
        vals = [0, 0, 0];
        index = 0;
        op1 = "", op2 = "";
    });

    setupOperators();

    document.querySelector("#equals").addEventListener('click', () => {
        vals[index] = +disp.value;
        disp.value = "";
        // for basic a + b = c and then c + d = e, and so forth
        display(operate(op1, vals[index - 1], vals[index]));
        vals = [+disp.value, 0, 0];
        index = 1;
        op1 = "";
        // if(vals[index] != 0) {
        //     display(operate(op1, vals[index - 1], vals[index]));
        // } else if(op1 != "") {
        //     display(operate(op1, vals[index - 1], vals[index - 1]));
        // } else {
        //     document.querySelector("input").value = "0";
        //     vals = [0, 0, 0];
        //     index = 0;
        //     op1 = "", op2 = "";
        // }
        console.log(vals);
        console.log(op1 + " " + op2);
    });

    document.querySelector("#backspace").addEventListener('click', backspace);

    document.addEventListener('keydown', event => {
        if(event.key == "Backspace") {
            backspace();
        }
    });

    function backspace() {
        if(disp.value.length == 1) {
            disp.value = "0";
        } else {
            disp.value = disp.value.substring(0, disp.value.length - 1);
        }
    }
    
}
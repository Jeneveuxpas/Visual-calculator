document.addEventListener("keydown", function (event) {
    const key = event.key;
    if (key == "Enter") {
        calculateResult();
    } else if (key == "Escape") {
        clearDisplay();
    }
});


let expr = '';

function appendToDisplay(value) {
    check();
    expr += value;
    document.getElementById('display').value = expr;
    check();
}

function clearDisplay() {
    check();
    expr = '';
    document.getElementById('display').value = '';
    document.getElementById('display2').value = '';
    check();
}

function formatNumber(number) {
    if (Number.isInteger(number)) {
        return number; // 如果是整数，直接返回整数
    } else {
        return parseFloat(number.toFixed(10)); // 如果是小数，保留6位小数并返回
    }
}
function delToDisplay() {
    check();
    expr = expr.slice(0, -1);
    document.getElementById('display').value = expr;
    check();
}
function calculateResult() {
    check();
    try {
        expr = expr.replace(/lg/g, 'Math.log10').replace(/ln/g, 'Math.log').replace(/sqrt/g, 'Math.sqrt').replace(/sin/g, 'Math.sin').replace(/\^/g, '**').replace(/cos/g, 'Math.cos').replace(/tan/g, 'Math.tan').replace(/e/g, 'Math.E').replace(/pi/g, 'Math.PI').replace(/abs/g, 'Math.abs');
        expr = eval(expr);
        expr = formatNumber(expr);
        if (!/[0-9\.]/.test(String(expr))) expr = 'error';
        document.getElementById('display2').value = expr;
    } catch (error) {
        document.getElementById('display').value = '';
        document.getElementById('display2').value = 'error';
    }
    check();
}


function check() {
    expr = document.getElementById('display').value;
}

module.exports = {
    calculateResult,clearDisplay,appendToDisplay,delToDisplay
}
let isOn = false;

function togglePower() {
    isOn = !isOn;
    const onoffBtn = document.getElementById('onoff');
    const expr = document.getElementById('expression');
    const result = document.getElementById('result');
    const allBtns = document.querySelectorAll('.buttons button');

    if (isOn) {
        onoffBtn.classList.remove('off');
        onoffBtn.classList.add('on');
        expr.style.background = "#fff";
        expr.style.color = "#000";
        result.style.background = "#fff";
        result.style.color = "#000";
        expr.textContent = "0";
        result.value = "";
        allBtns.forEach(btn => { if (btn.id !== 'onoff') btn.disabled = false; });
    } else {
        onoffBtn.classList.remove('on');
        onoffBtn.classList.add('off');
        expr.style.background = "rgba(0, 0, 255, 0.1)";
        expr.style.color = "#0f0";
        result.style.background = "rgba(0, 0, 255, 0.1)";
        result.style.color = "#0f0";
        expr.textContent = "";
        result.value = "";
        allBtns.forEach(btn => { if (btn.id !== 'onoff') btn.disabled = true; });
    }
}

function append(value) {
    if (!isOn) return;
    let expr = document.getElementById("expression");
    if (expr.textContent === "0") expr.textContent = "";
    expr.textContent += value;
}

function clearAll() {
    if (!isOn) return;
    document.getElementById("expression").textContent = "0";
    document.getElementById("result").value = "";
}

function deleteLast() {
    if (!isOn) return;
    let expr = document.getElementById("expression");
    expr.textContent = expr.textContent.slice(0, -1) || "0";
}

function calculate() {
    if (!isOn) return;
    let exprEl = document.getElementById("expression");
    let resultEl = document.getElementById("result");
    try {
        let expr = exprEl.textContent
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/sin\(([^)]+)\)/g, (_, val) => `Math.sin((${val}) * Math.PI / 180)`)
            .replace(/cos\(([^)]+)\)/g, (_, val) => `Math.cos((${val}) * Math.PI / 180)`)
            .replace(/tan\(([^)]+)\)/g, (_, val) => `Math.tan((${val}) * Math.PI / 180)`)
            .replace(/log\(/g, "Math.log10(")
            .replace(/ln\(/g, "Math.log(")
            .replace(/sqrt\(/g, "Math.sqrt(")
            .replace(/\^/g, "**");


        expr = replaceFactorials(expr);

        let val = eval(expr);
        resultEl.value = val;
    } catch {
        resultEl.value = "Error";
    }
}

function replaceFactorials(expr) {
    // Replace factorial like 5! with the actual factorial value
    return expr.replace(/(\d+)!/g, (_, n) => factorial(parseInt(n)));
}

function factorial(n) {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
}

// Initially disable all buttons except ON/OFF
document.querySelectorAll('.buttons button').forEach(btn => { 
    if (btn.id !== 'onoff') btn.disabled = true; 
});

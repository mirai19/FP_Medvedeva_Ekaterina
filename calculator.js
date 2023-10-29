// Калькулятор
const calculator = (() => {
    let input = '';
    let history = [];

    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');

    const clearDisplay = () => {
        input = '';
        updateDisplay();
    };

    const undo = () => {
        input = input.slice(0, -1);
        updateDisplay();
    };

    const appendCharacter = (char) => {
		if (char === '^') {
            input += '**';
        } else{
			input += char;
		}
        updateDisplay();
    };

    const calculate = () => {
        try {
            const result = Function('"use strict";return (' + input + ')')();
            addToHistory(`${input} = ${result}`);
            input = result.toString();
            updateDisplay();
        } catch (error) {
            input = 'Error';
            updateDisplay();
        }
    };

    const addToHistory = (operation) => {
        history.push(operation);
        updateHistoryDisplay();
    };

    const updateHistoryDisplay = () => {
        historyDisplay.innerHTML = 'History:<br>' + history.join('<br>');
    };

    const updateDisplay = () => {
        display.value = input;
    };

    return {
        clearDisplay,
        undo,
        appendCharacter,
        calculate,
        updateDisplay
    };
})();

window.calculator = calculator;

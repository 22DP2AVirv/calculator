let history = JSON.parse(localStorage.getItem('calcHistory')) || [];

function appendNumber(number) {
    const display = document.getElementById('display');
    display.value += number;
}

function appendOperator(operator) {
    const display = document.getElementById('display');
    display.value += ` ${operator} `;
}

function clearInput() {
    document.getElementById('display').value = '';
}

function calculate() {
    const display = document.getElementById('display');
    try {
        const result = eval(display.value);
        if (result !== undefined) {
            const expression = display.value + ' = ' + result;
            history.push(expression);
            saveHistory();
            updateHistory();
            display.value = result;
        }
    } catch {
        display.value = 'Error';
    }
}

function saveHistory() {
    localStorage.setItem('calcHistory', JSON.stringify(history));
}

function updateHistory() {
    const historyElement = document.getElementById('history');
    historyElement.innerHTML = '';
    history.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = entry;
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Dzēst';
        deleteButton.onclick = () => {
            history.splice(index, 1);
            saveHistory();
            updateHistory();
        };
        listItem.appendChild(deleteButton);
        historyElement.appendChild(listItem);
    });
}

function clearHistory() {
    history = [];
    saveHistory();
    updateHistory();
}

// Ielādē vēsturi sākumā
updateHistory();

const display = document.getElementById("display");
const history = document.getElementById("history");
const clearHistoryButton = document.getElementById("clear-history");

var numChar;
var currentChar, previousChar;
var operations = ['+','-','*','/'];
var historyList = [];

clearHistoryButton.addEventListener("click", clearHistory);

function appendToDisplay(input){
    display.value += input;
    numChar = display.value.length;
    currentChar = input;
    getPreviousChar();
}

function clearDisplay(){
    display.value = "";
}

function calculate(){
    try{
        const result = eval(display.value);
        const operation = `${display.value} = ${result}`;
        display.value = result;
        addToHistory(operation);
    }
    catch(error){
        display.value = "Error";
    }
}

function getPreviousChar(){
    previousChar = display.value.substring(numChar - 2, numChar - 1);
    checkSyntax();
}

function checkSyntax(){
    if(operations.includes(currentChar) && numChar == 1){
        removeChar();
    }
    if(operations.includes(previousChar) && operations.includes(currentChar)){
        if(previousChar == currentChar){
            removeChar();
        } else {
            overwrite();
        }
    }        
}

function overwrite(){
    display.value = display.value.slice(0, numChar - 2) + display.value.slice(numChar - 1);
}

function removeChar(){
    display.value = display.value.substring(0, numChar - 1);
}

function addToHistory(operation){
    historyList.push(operation);
    updateHistoryDisplay();
}

function updateHistoryDisplay(){
    history.innerHTML = '';
    historyList.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item;
        history.appendChild(div);
    });
}

function clearHistory(){
    historyList = [];
    updateHistoryDisplay();
}

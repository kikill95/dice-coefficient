var diceCoefficient = require('dice-coefficient');
var inputElement = document.getElementsByTagName('input')[0];
var referenceElement = document.getElementsByTagName('input')[1];
var outputElement = document.getElementsByTagName('output')[0];

function getDistance() {
    outputElement.textContent = diceCoefficient(inputElement.value, referenceElement.value);
}

inputElement.addEventListener('input', getDistance);
referenceElement.addEventListener('input', getDistance);

getDistance();

'use strict';

var diceCoefficient = require('dice-coefficient');

var $input = document.getElementsByTagName('input')[0];
var $reference = document.getElementsByTagName('input')[1];
var $output = document.getElementsByTagName('output')[0];

$input.addEventListener('input', oninputchange);
$reference.addEventListener('input', oninputchange);

oninputchange();

function oninputchange() {
  $output.textContent = diceCoefficient($input.value, $reference.value);
}

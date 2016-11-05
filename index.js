'use strict';

/* Dependencies. */
var diceCoefficient = require('dice-coefficient');

/* Nodes. */
var $input = document.getElementsByTagName('input')[0];
var $reference = document.getElementsByTagName('input')[1];
var $output = document.getElementsByTagName('output')[0];

/* Listen. */
$input.addEventListener('input', oninputchange);
$reference.addEventListener('input', oninputchange);

/* Initial answer. */
oninputchange();

/* Calc. */
function oninputchange() {
  $output.textContent = diceCoefficient($input.value, $reference.value);
}

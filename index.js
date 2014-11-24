'use strict';

/**
 * Dependencies.
 */

var diceCoefficient = require('wooorm/dice-coefficient@0.1.3');

/**
 * DOM elements.
 */

var $input = document.getElementsByTagName('input')[0];
var $reference = document.getElementsByTagName('input')[1];
var $output = document.getElementsByTagName('output')[0];

/**
 * Event handlers.
 */

function oninputchange() {
    $output.textContent = diceCoefficient($input.value, $reference.value);
}

/**
 * Listen.
 */

$input.addEventListener('input', oninputchange);
$reference.addEventListener('input', oninputchange);

/**
 * Initial answer.
 */

oninputchange();

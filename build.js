(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"dice-coefficient":2}],2:[function(require,module,exports){
'use strict';

var bigrams = require('n-gram').bigram;

module.exports = diceCoefficient;

/* Get the edit-distance according to Dice between two values. */
function diceCoefficient(value, alternative) {
  var left = bigrams(String(value).toLowerCase());
  var right = bigrams(String(alternative).toLowerCase());
  var rightLength = right.length;
  var length = left.length;
  var index = -1;
  var intersections = 0;
  var rightPair;
  var leftPair;
  var offset;

  while (++index < length) {
    leftPair = left[index];
    offset = -1;

    while (++offset < rightLength) {
      rightPair = right[offset];

      if (leftPair === rightPair) {
        intersections++;

        /* Make sure this pair never matches again */
        right[offset] = '';
        break;
      }
    }
  }

  return 2 * intersections / (left.length + rightLength);
}

},{"n-gram":3}],3:[function(require,module,exports){
'use strict';

/* Expose. */
module.exports = exports = nGram;

exports.bigram = nGram(2);
exports.trigram = nGram(3);

/* Factory returning a function that converts a given string
 * to n-grams. */
function nGram(n) {
  if (typeof n !== 'number' || isNaN(n) || n < 1 || n === Infinity) {
    throw new Error('`' + n + '` is not a valid argument for n-gram');
  }

  return grams;

  /* Create n-grams from a given value. */
  function grams(value) {
    var nGrams = [];
    var index;

    if (value === null || value === undefined) {
      return nGrams;
    }

    value = String(value);
    index = value.length - n + 1;

    if (index < 1) {
      return nGrams;
    }

    while (index--) {
      nGrams[index] = value.substr(index, n);
    }

    return nGrams;
  }
}

},{}]},{},[1]);

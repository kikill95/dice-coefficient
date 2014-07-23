/**
 * Require the module at `name`.
 *
 * @param {String} name
 * @return {Object} exports
 * @api public
 */

function require(name) {
  var module = require.modules[name];
  if (!module) throw new Error('failed to require "' + name + '"');

  if (!('exports' in module) && typeof module.definition === 'function') {
    module.client = module.component = true;
    module.definition.call(this, module.exports = {}, module);
    delete module.definition;
  }

  return module.exports;
}

/**
 * Registered modules.
 */

require.modules = {};

/**
 * Register module at `name` with callback `definition`.
 *
 * @param {String} name
 * @param {Function} definition
 * @api private
 */

require.register = function (name, definition) {
  require.modules[name] = {
    definition: definition
  };
};

/**
 * Define a module's exports immediately with `exports`.
 *
 * @param {String} name
 * @param {Generic} exports
 * @api private
 */

require.define = function (name, exports) {
  require.modules[name] = {
    exports: exports
  };
};
require.register("wooorm~dice-coefficient@0.1.0", function (exports, module) {
'use strict';

function getPairs(value) {
    value = String(value).toLowerCase();

    var iterator = -1,
        length = value.length - 1,
        pairs = [];

    while (++iterator < length) {
        pairs[iterator] = value.substring(iterator, iterator + 2);
    }

    return pairs;
}

function diceCoefficient(value, alternative) {
    var pairs = getPairs(value),
        alternativePairs = getPairs(alternative),
        intersections = 0,
        iterator = -1,
        alternativeLength = alternativePairs.length,
        alternativeIterator, alternativePair, pair;

    while (pair = pairs[++iterator]) {
        alternativeIterator = -1;

        while (++alternativeIterator < alternativeLength) {
            alternativePair = alternativePairs[alternativeIterator];

            if (pair === alternativePair) {
                intersections++;

                /* Make sure this pair never matches again */
                alternativePairs[alternativeIterator] = '';
                break;
            }
        }
    }

    return 2 * intersections / (pairs.length + alternativeLength);
}

module.exports = diceCoefficient;

});

require.register("dice-coefficient-gh-pages", function (exports, module) {
var diceCoefficient = require("wooorm~dice-coefficient@0.1.0");
var inputElement = document.getElementsByTagName('input')[0];
var referenceElement = document.getElementsByTagName('input')[1];
var outputElement = document.getElementsByTagName('output')[0];

function getDistance() {
    outputElement.textContent = diceCoefficient(inputElement.value, referenceElement.value);
}

inputElement.addEventListener('input', getDistance);
referenceElement.addEventListener('input', getDistance);

getDistance();

});

require("dice-coefficient-gh-pages")

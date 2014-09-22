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
require.register("wooorm~n-gram@0.0.1", function (exports, module) {
'use strict';

/**
 * A factory returning a function that converts a given string to n-grams.
 *
 * @example
 *   nGram(2) // [Function]
 *
 * @example
 *   nGram(4) // [Function]
 *
 *
 * @param {number} n - The `n` in n-gram.
 * @throws {Error} When `n` is not a number (incl. NaN), Infinity, or lt 1.
 * @return {Function} A function creating n-grams from a given value.
 */

function nGram(n) {
    if (
        typeof n !== 'number' ||
        n < 1 ||
        n !== n ||
        n === Infinity
    ) {
        throw new Error(
            'Type error: `' + n + '` is not a valid argument for n-gram'
        );
    }

    /**
     * Create n-grams from a given value.
     *
     * @example
     *   nGram(4)('n-gram')
     *   // ['n-gr', '-gra', 'gram']
     *
     * @param {*} value - The value to stringify and convert into n-grams.
     * @return {Array.<string>} n-grams
     */

    return function (value) {
        var nGrams = [],
            index;

        if (value === null || value === undefined) {
            return nGrams;
        }

        value = String(value);
        index = value.length - n + 1;

        if (index < 1) {
            return [];
        }

        while (index--) {
            nGrams[index] = value.substr(index, n);
        }

        return nGrams;
    };
}

/**
 * Export `n-gram`.
 */

module.exports = nGram;

/**
 * Create bigrams from a given value.
 *
 * @example
 *   bigram('n-gram')
 *   // ["n-", "-g", "gr", "ra", "am"]
 *
 * @param {*} value - The value to stringify and convert into bigrams.
 * @return {Array.<string>} bigrams
 */

nGram.bigram = nGram(2);

/**
 * Create trigrams from a given value.
 *
 * @example
 *   trigram('n-gram')
 *   // ["n-g", "-gr", "gra", "ram"]
 *
 * @param {*} value - The value to stringify and convert into trigrams.
 * @return {Array.<string>} trigrams
 */

nGram.trigram = nGram(3);

});

require.register("wooorm~dice-coefficient@0.1.1", function (exports, module) {
'use strict';

var getBigrams;

/**
 * Module dependencies.
 */

getBigrams = require("wooorm~n-gram@0.0.1").bigram;

/**
 * Get the edit-distance according to Dice between two values.
 *
 * @param {*} value - First value.
 * @param {*} alternative - Second value.
 * @return {number} Edit distance.
 */

function diceCoefficient(value, alternative) {
    var pairs,
        alternativePairs,
        intersections,
        iterator,
        alternativeLength,
        alternativeIterator,
        alternativePair,
        pair;

    pairs = getBigrams(String(value).toLowerCase());
    alternativePairs = getBigrams(String(alternative).toLowerCase());
    intersections = 0;
    iterator = -1;
    alternativeLength = alternativePairs.length;

    while (pair = pairs[++iterator]) {
        alternativeIterator = -1;

        while (++alternativeIterator < alternativeLength) {
            alternativePair = alternativePairs[alternativeIterator];

            if (pair === alternativePair) {
                intersections++;

                /**
                 * Make sure this pair never matches again
                 */

                alternativePairs[alternativeIterator] = '';
                break;
            }
        }
    }

    return 2 * intersections / (pairs.length + alternativeLength);
}

/**
 * Expose `diceCoefficient`.
 */

module.exports = diceCoefficient;

});

require.register("dice-coefficient-gh-pages", function (exports, module) {
var diceCoefficient = require("wooorm~dice-coefficient@0.1.1");
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

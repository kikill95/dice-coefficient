(function outer(modules, cache, entries){

  /**
   * Global
   */

  var global = (function(){ return this; })();

  /**
   * Require `name`.
   *
   * @param {String} name
   * @param {Boolean} jumped
   * @api public
   */

  function require(name, jumped){
    if (cache[name]) return cache[name].exports;
    if (modules[name]) return call(name, require);
    throw new Error('cannot find module "' + name + '"');
  }

  /**
   * Call module `id` and cache it.
   *
   * @param {Number} id
   * @param {Function} require
   * @return {Function}
   * @api private
   */

  function call(id, require){
    var m = cache[id] = { exports: {} };
    var mod = modules[id];
    var name = mod[2];
    var fn = mod[0];

    fn.call(m.exports, function(req){
      var dep = modules[id][1][req];
      return require(dep ? dep : req);
    }, m, m.exports, outer, modules, cache, entries);

    // expose as `name`.
    if (name) cache[name] = cache[id];

    return cache[id].exports;
  }

  /**
   * Require all entries exposing them on global if needed.
   */

  for (var id in entries) {
    if (entries[id]) {
      global[entries[id]] = require(id);
    } else {
      require(id);
    }
  }

  /**
   * Duo flag.
   */

  require.duo = true;

  /**
   * Expose cache.
   */

  require.cache = cache;

  /**
   * Expose modules
   */

  require.modules = modules;

  /**
   * Return newest require.
   */

   return require;
})({
1: [function(require, module, exports) {
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

}, {"wooorm/dice-coefficient@0.1.3":2}],
2: [function(require, module, exports) {
'use strict';

var getBigrams;

/**
 * Module dependencies.
 */

getBigrams = require('n-gram').bigram;

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
        length,
        alternativeLength,
        alternativeIterator,
        alternativePair,
        pair;

    pairs = getBigrams(String(value).toLowerCase());
    alternativePairs = getBigrams(String(alternative).toLowerCase());
    intersections = 0;
    iterator = -1;
    alternativeLength = alternativePairs.length;
    length = pairs.length;

    while (++iterator < length) {
        pair = pairs[iterator];

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

}, {"n-gram":3}],
3: [function(require, module, exports) {
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

}, {}]}, {}, {"1":""})

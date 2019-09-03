/* eslint-disable strict,import/no-commonjs,no-underscore-dangle,prefer-rest-params,lines-around-directive */
'use strict';

exports.__esModule = true;

var _curryN = require('../function/curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns the first element of the list which matches the predicate, or
 * `undefined` if no element matches.
 *
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} arr The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      find(x => x.a === 2)(xs); //=> {a: 2}
 *      find(x => x.a === 4)(xs); //=> undefined
 */
exports.default = (0, _curryN2.default)(2, function(fn) {
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    for (var i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            return arr[i];
        }
    }
});

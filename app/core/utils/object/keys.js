/* eslint-disable strict,import/no-commonjs,no-underscore-dangle,lines-around-directive */
'use strict';

exports.__esModule = true;

var _object = require('../is/object');

var _object2 = _interopRequireDefault(_object);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Returns a list containing the names of all the enumerable own properties of
 * the supplied object.
 * Note that the order of the output array is not guaranteed to be consistent
 * across different JS platforms.
 *
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
exports.default = function(obj)
{
    return (0, _object2.default)(obj) ? Object.keys(obj) : [];
};

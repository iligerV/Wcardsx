/* eslint-disable strict,lines-around-directive,import/no-commonjs,no-underscore-dangle,prefer-rest-params */
'use strict';

// eslint-disable-next-line import/no-commonjs
exports.__esModule = true;

var _curryN = require('../function/curryN');

var _curryN2 = _interopRequireDefault(_curryN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Given a function that generates a key, turns a list of objects into an
 * object indexing the objects by the given key. Note that if multiple
 * objects generate the same value for the indexing key only the last value
 * will be included in the generated object.
 *
 * @param {Function} fn Function :: a -> String
 * @param {Array} arr The array of objects to index
 * @return {Object} An object indexing each array element by the given property.
 * @example
 *
 *      var list = [{id: 'xyz', title: 'A'}, {id: 'abc', title: 'B'}];
 *      indexBy(x => x.id, list);
 *      //=> {abc: {id: 'abc', title: 'B'}, xyz: {id: 'xyz', title: 'A'}}
 */
exports.default = (0, _curryN2.default)(2, function(fn)
{
    var arr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var result = {};

    for (var i = 0; i < arr.length; i++)
    {
        result[fn(arr[i])] = arr[i];
    }

    return result;
});

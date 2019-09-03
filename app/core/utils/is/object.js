/* eslint-disable strict,lines-around-directive,import/no-commonjs,no-underscore-dangle */
'use strict';

exports.__esModule = true;

/**
 * Checks if `test` is object.
 *
 * @param {*} test The value to check.
 * @returns {boolean} Returns `true` if `test` is object, else `false`.
 * @example
 *
 * isObject({ a: 'test' }); // => true
 * isObject(null); // => false
 */
exports.default = function(test)
{
    return test !== null && typeof test === 'object';
};

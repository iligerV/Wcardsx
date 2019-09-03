/* eslint-disable strict,import/no-commonjs,no-underscore-dangle,lines-around-directive,prefer-rest-params,block-scoped-var */
'use strict';

exports.__esModule = true;

/**
 * Returns a curried equivalent of the provided function, with the specified
 * arity. If `g` is `curryN(3, f)`, the
 * following are equivalent:
 *
 *   - `g(1)(2)(3)`
 *   - `g(1)(2, 3)`
 *   - `g(1, 2)(3)`
 *   - `g(1, 2, 3)`
 *
 * @param {Number} arity The arity for the returned function.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @example
 *
 *      var sumArgs = (...args) => sum(args);
 *
 *      var curriedAddFourNumbers = curryN(4, sumArgs);
 *      var f = curriedAddFourNumbers(1, 2);
 *      var g = f(3);
 *      g(4); //=> 10
 */
exports.default = function(arity, fn)
{
    return function curried()
    {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++)
        {
            args[_key] = arguments[_key];
        }

        if (args.length >= arity)
        {
            return fn.apply(this, args);
        }

        return function()
        {
            for (var _len2 = arguments.length, newArgs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
            {
                newArgs[_key2] = arguments[_key2];
            }

            return curried.apply(this, args.concat(newArgs));
        };
    };
};

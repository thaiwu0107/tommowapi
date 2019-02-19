'use strict';

const BigNumber = require('bignumber.js');

/**
 * 統一常用工具類
 * @class Utils
 */
/**
 * 金錢轉成點數
 * @function
 * @param {number | BigNumber} value
 * @return {number}
 * @memberof Utils
 */
exports.dollarToCent = (value) => {
    return new BigNumber(value).shiftedBy(2).toNumber();
};
/**
 * 點數轉成金錢
 * @function
 * @param {number | BigNumber} value
 * @return {number}
 * @memberof Utils
 */
exports.centToDollar = (value) => {
    return new BigNumber(value).div(100).toNumber();
};
/**
 * Buffer轉成Base64
 * @function
 * @param {*} data
 * @return {string}
 * @memberof Utils
 */
exports.buffArrayToBase64 = (data) => {
    return new Buffer(data, 'binary').toString('base64');
};
/**
 * Base64轉成Buffer
 * @function
 * @param {*} data
 * @return {Buffer}
 * @memberof Utils
 */
exports.base64ToBuffArray = (data) => {
    return new Buffer(data, 'base64');
};
/**
 * Pack an array to an Object
 *
 * @param {array} array
 * @return {object}
 * @memberof Utils
 * @example
 * ```js
 * > packObject(['a', 'b', 'c', 'd'])
 * { a: 'b', c: 'd' }
 * ```
 */
exports.packObject = (array) => {
    const result = {};
    const length = array.length;
    for (let i = 1; i < length; i += 2) {
        result[array[i - 1]] = array[i];
    }
    return result;
};
/**
 * Convert an object to an array
 *
 * @param {object} obj
 * @return {array}
 * @memberof Utils
 * @example
 * ```js
 * > convertObjectToArray({ a: '1' })
 * ['a', '1']
 * ```
 */
exports.convertObjectToArray = (obj) => {
    const result = [];
    const keys = Object.keys(obj);
    for (let i = 0, l = keys.length; i < l; i++) {
        result.push(keys[i], obj[keys[i]]);
    }
    return result;
};
/**
 * Convert a map to an array
 *
 * @param {Map} map
 * @return {array}
 * @memberof Utils
 * @example
 * ```js
 * > convertObjectToArray(new Map([[1, '2']]))
 * [1, '2']
 * ```
 */
exports.convertMapToArray = (map) => {
    const result = [];
    let pos = 0;
    map.forEach((value, key) => {
        result[pos] = key;
        result[pos + 1] = value;
        pos += 2;
    });
    return result;
};

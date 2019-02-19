'use strict';

/**
 * 觀察進來的request有哪些東西
 * @static
 * @param {*} request
 * @param {*} reply
 * @param {*} done
 * @memberof DeBug
 */
exports.consloeAll = (request, reply, done) => {
    console.log('request', 'thai');
    // 一定要執行done();
    done();
};
/**
 *
 *
 * @static
 * @param {*} request
 * @param {*} reply
 * @param {*} done
 * @memberof DeBug
 */
exports.consloeQuerys = (request, reply, done) => {
    console.log('query', request.query);
    // 一定要執行done();
    done();
};
/**
 *
 *
 * @static
 * @param {*} request
 * @param {*} reply
 * @param {*} done
 * @memberof DeBug
 */
exports.consloeParams = (request, reply, done) => {
    console.log('params', request.params);
    // 一定要執行done();
    done();
};

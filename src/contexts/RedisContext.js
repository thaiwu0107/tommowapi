'use strict';

const IORedis = require('ioredis');
const Utils = require('../utils/Utils');

/**
 * 單個Redis使用的
 * @static
 * @param {*} jsonConfig
 * @memberof RedisContext
 */
exports.initialize = async (jsonConfig) => {
    this.redis = new IORedis(jsonConfig.port, jsonConfig.host, {
        dropBufferSupport: true,
        enableReadyCheck: true,
        stringNumbers: true,
    });
    const changePromis = this.redis;
    changePromis.Promise = global.Promise;
    IORedis.Command.setArgumentTransformer('hmset', (args) => {
        if (args.length === 2) {
            if (typeof Map !== 'undefined' && args[1] instanceof Map) {
                return [args[0]].concat(Utils.convertMapToArray(args[1]));
            }
            if (typeof args[1] === 'object' && args[1] !== null) {
                return [args[0]].concat(Utils.convertObjectToArray(args[1]));
            }
        }
        return args;
    });
    IORedis.Command.setReplyTransformer('hgetall', (result) => {
        if (Array.isArray(result)) {
            const obj = {};
            for (let i = 0; i < result.length; i += 2) {
                obj[result[i]] = result[i + 1];
            }
            return obj;
        }
        return result;
    });
    IORedis.Command.setReplyTransformer('exec', (result) => {
        if (Array.isArray(result)) {
            const size = result.length;
            const finalData = [];
            for (let index = 0; index < size; index++) {
                const error = result[index][0];
                if (error) {
                    throw error;
                }
                finalData.push(result[index][1]);
            }
            return finalData;
        }
        return result;
    });
    console.log(`RedisContext is ready.`);
};
/**
 *
 *
 * @static
 * @param {*} jsonConfig
 * @memberof RedisContext
 */
exports.initializeCluster = async (jsonConfig) => {
    this.redis = new IORedis.Cluster(jsonConfig, {
        enableReadyCheck: true,
        clusterRetryStrategy: (times) => {
            return Math.min(100 + (times * 2), 2000);
        },
        scaleReads: 'all',
        redisOptions: {
            dropBufferSupport: true,
            enableReadyCheck: true,
            stringNumbers: true,
        },
    });
    const changePromis = this.redis;
    changePromis.Promise = global.Promise;
    this.allAll = this.redis.nodes('all');
    this.allSlaves = this.redis.nodes('slave');
    this.allMasters = this.redis.nodes('master');
    IORedis.Command.setArgumentTransformer('hmset', (args) => {
        if (args.length === 2) {
            if (typeof Map !== 'undefined' && args[1] instanceof Map) {
                return [args[0]].concat(Utils.convertMapToArray(args[1]));
            }
            if (typeof args[1] === 'object' && args[1] !== null) {
                return [args[0]].concat(Utils.convertObjectToArray(args[1]));
            }
        }
        return args;
    });
    IORedis.Command.setReplyTransformer('hgetall', (result) => {
        if (Array.isArray(result)) {
            const obj = {};
            for (let i = 0; i < result.length; i += 2) {
                obj[result[i]] = result[i + 1];
            }
            return obj;
        }
        return result;
    });
    IORedis.Command.setReplyTransformer('hmget', (result) => {
        if (Array.isArray(result)) {
            const obj = {};
            for (let i = 0; i < result.length; i += 2) {
                obj[result[i]] = result[i + 1];
            }
            return obj;
        }
        return result;
    });
};

exports.getRedis = () => {
    return this.redis;
};

'use strict';

const Joi = require('joi');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const Pino = require('pino');

// 指定.env路徑是在src外層
require('dotenv').config({
    path: path.join(__dirname, '..', '.env'),
});

const envVarSchema = Joi.object().keys({
    NODE_ENV: Joi.string().default('development').allow(['development', 'production']),
    PORT: Joi.number().default(3100),
    VERSION: Joi.string(),
    HOST: Joi.string().default('0.0.0.0'),
    LOG_LEVEL: Joi.string().default('error').allow(['fatal', 'error', 'warn', 'info', 'debug', 'trace']),
    JWT_ENABLE: Joi.boolean().default(false),
    HTTP2: Joi.boolean().default(false),
    JWT_PRIVATEKEY: Joi.string(),
    LOGGER: Joi.boolean().default(false),
    DB_USER: Joi.string().default('root'),
    REDIS_CLUSTERS: Joi.string(),
    HTTPS_KEY: Joi.string(),
    HTTPS_CERT: Joi.string(),
    ARANGODB_CLUSTER: Joi.string(),
    REDIS_HOSTS: Joi.string(),
    ARANGODB_HOST1: Joi.string(),
    ARANGODB_HOST2: Joi.string(),
    ARANGODB_HOST3: Joi.string(),
    ARANGO_VERSION: Joi.number(),
}).unknown().required();
const logConfig = new Pino({ level: 'error' });
const { error, value: envVars } = Joi.validate(process.env, envVarSchema);
if (error) {
    logConfig.error('error', `Config validation error: ${error.message}`);
    process.exit(1);
}

// 處理Redis的Host跟Port
const REDIS_CLUSTERS = [];
const redisNode = _.split(envVars.REDIS_CLUSTERS, ',');
_.forEach(redisNode, (node) => {
    const [, port] = _.split(node, ':');
    REDIS_CLUSTERS.push({
        port,
        host: envVars.REDIS_HOSTS,
    });
});
// 處理ArangoDB的連線設定
// let arangodbNodes = _.replace(envVars.ARANGODB_CLUSTER, '{ARANGODB_HOST1}', envVars.ARANGODB_HOST1);
// arangodbNodes = _.replace(arangodbNodes, '{ARANGODB_HOST2}', envVars.ARANGODB_HOST2);
// arangodbNodes = _.replace(arangodbNodes, '{ARANGODB_HOST3}', envVars.ARANGODB_HOST3);
// arangodbNodes = _.split(arangodbNodes, ',');

// 處理一些常見的判斷
const httpsCert = envVars.HTTP2 ? {
    https: {
        key: fs.readFileSync(path.resolve(envVars.HTTPS_KEY), 'utf8'),
        cert: fs.readFileSync(path.resolve(envVars.HTTPS_CERT), 'utf8'),
    },
} : {};

const commonOptions = {
    http2: envVars.HTTP2,
};

/**
 * 分成三種情況:
 * 1.development -> 都是強制開啟log(要不要美化是看指令npm run start:dev ,會做美化log)
 * 2.production  -> 完全不想開log(只剩當機的訊息)
 * 3.production  -> 只開啟普通log(要不要美化是看指令npm run start:dev ,會做美化log)
 * 另外沒有美化的log出來很難閱讀,會再有一個美化用的工具可以重新整理一次
*/
const log = new Pino({
    level: envVars.LOG_LEVEL,
});
const IS_DEVELOPMENT = envVars.NODE_ENV === 'development' ? true : false;
const logOptions = IS_DEVELOPMENT || envVars.LOGGER ? { logger: log } : { logger: false };
// 這是fastify會直接拿去使用的設定值,如果有需要增加可以在這裡再改
const FASTIFY_OPTIONS = _.assign(commonOptions, httpsCert, logOptions);
module.exports = {
    VERSION: envVars.VERSION,
    NODE_ENV: envVars.NODE_ENV,
    PORT: envVars.PORT,
    HOST: envVars.HOST,
    HTTP2: envVars.HTTP2,
    JWT_ENABLE: envVars.JWT_ENABLE,
    JWT_PRIVATEKEY: envVars.JWT_PRIVATEKEY,
    DB_HOST: envVars.DB_HOST,
    DB_PORT: envVars.DB_PORT,
    DB_USER: envVars.DB_USER,
    DB_PASSWORD: envVars.DB_PASSWORD,
    LOGGER: envVars.LOGGER,
    LOG_LEVEL: envVars.LOG_LEVEL,
    REDIS_CLUSTERS,
    FASTIFY_OPTIONS,
    HTTPS_KEY: envVars.HTTPS_KEY,
    HTTPS_CERT: envVars.HTTPS_CERT,
    ARANGODB_NODES: envVars.ARANGODB_CLUSTER,
    ARANGO_VERSION: envVars.ARANGO_VERSION,
};

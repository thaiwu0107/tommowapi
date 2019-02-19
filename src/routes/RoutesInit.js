'use strict';

const fp = require('fastify-plugin');
const RoutesMapping = require('./RouteMapping');
const _ = require('lodash');
const path = require('path');
const Aigle = require('aigle');
const ArangoContext = require('../contexts/ArangoContext');
const RedisManger = require('../managers/RedisManager');
Aigle.mixin(require('lodash'));

const apiFilesPath = path.join('..', 'api');

async function makeUrlPaths(fastify, prefixKeys) {
    const array = [];
    let targetServicePath;

    return Aigle.forEachSeries(prefixKeys, (prefixKey) => {
        // enable: true 才會載入, 剩下的不理會
        targetServicePath = path.join(apiFilesPath, prefixKey);

        return Aigle.filter(RoutesMapping[prefixKey], 'enable')
            .then(async (enablePathList) => {
                await Aigle.forEachSeries(enablePathList, async (data) => {
                    // 先取得Schema跟JsFile
                    const targetSchema = require(path.join(targetServicePath, data.module + '.schema'));
                    const targetJsFile = require(path.join(targetServicePath, data.module));

                    // 注入instance
                    targetJsFile.fastify = fastify;
                    targetJsFile.RedisManger = new RedisManger();
                    targetJsFile.ArangoManager = ArangoContext.getDB();

                    const routeObj = {
                        method: _.toUpper(data.method),
                        url: '/' + _.toLower(prefixKey) + data.path,
                        schema: targetSchema[data.endpoint],
                        handler: targetJsFile[data.endpoint],
                        beforeHandler: [],
                    };

                    if (!_.isEmpty(data.beforeHandler)) {
                        routeObj.beforeHandler.push(...data.beforeHandler);
                    }

                    if (!_.isEmpty(targetJsFile.beforeHandler)) {
                        routeObj.beforeHandler.push(...targetJsFile.beforeHandler);
                    }
                    array.push(routeObj);
                });
            });
    })
        .then(() => {
            return array;
        });
}

module.exports = fp(async (fastify, opts, next) => {
    const urlPaths = await makeUrlPaths(fastify, Object.keys(RoutesMapping))
        .catch((err) => {
            throw err;
        });
    await Aigle.forEachSeries(urlPaths, (urlPath) => {
        fastify.route(urlPath);
    });

    next();
});

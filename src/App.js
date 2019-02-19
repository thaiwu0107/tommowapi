'use strict';

const Aigle = require('aigle');
global.Promise = Aigle;
const Config = require('./Config');
const Fastify = require('fastify');
const Cors = require('fastify-cors');
const Helmet = require('fastify-helmet');
const NoFavicon = require('fastify-no-icon');
const RoutesInit = require('./routes/RoutesInit');
const ArangoContext = require('./contexts/ArangoContext');
// const RedisContext = require('./contexts/RedisContext');
const GlobalHeartbeats = require('./contexts/GlobalHeartbeatsContext');

const fastify = new Fastify(Config.FASTIFY_OPTIONS);
Aigle.attempt(() => {
    return GlobalHeartbeats.initializeGlobalHeartbeats();
})
    // .then(() => {
    //     return RedisContext.initializeCluster(Config.REDIS_CLUSTERS);
    // })
    .then(() => {
        fastify.log.info('redis initialize done');
        return ArangoContext.initializeCluster(Config.ARANGODB_NODES, Config.ARANGO_VERSION, Config.DB_USER, Config.DB_PASSWORD);
    })
    .then(() => {
        fastify.log.info('arango initialize done');
        fastify.register(Cors);
        fastify.register(NoFavicon);
        fastify.register(Helmet,
                // 欺騙駭客我們是使用PHP/7.1.10版本
                { hidePoweredBy: { setTo: 'PHP/7.1.10' } });
        fastify.register(RoutesInit);
        return fastify.ready();
    })
    .then(() => {
        return fastify.listen(Config.PORT, Config.HOST)
            .catch((err) => {
                fastify.log.error(err);
                process.exit(0);
            });
    })
    .catch((err) => {
        fastify.log.error(err);
        process.exit(0);
    });

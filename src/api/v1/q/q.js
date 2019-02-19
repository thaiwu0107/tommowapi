const _ = require('lodash');
// const moment = require('moment');
const aql = require('arangojs').aql;

exports.q = async (request, reply) => {
    const qBigType = request.query.BigType.toString();
    const collection = this.ArangoManager.collection(qBigType);
    if (_.isUndefined(request.query.Date) && _.isUndefined(request.query.SmallType)) {
        const rawData = await this.ArangoManager.query(aql`
            FOR p IN ${collection}
            RETURN p
        `).then((cur) => cur.all()).then((d) => {
            return d;
        }).catch((err) => {
            throw err;
        });
        reply.send(_.sortBy(rawData, ['Time']));
    } else if (!_.isUndefined(request.query.SmallType) && _.isUndefined(request.query.Date)) {
        const rawData = await this.ArangoManager.query(aql`
            FOR p IN ${collection}
            FILTER p.SmallType == ${request.query.SmallType}
            RETURN p
        `).then((cur) => cur.all()).then((d) => {
            return d;
        }).catch((err) => {
            throw err;
        });
        reply.send(_.sortBy(rawData, ['Time']));
    } else if (!_.isUndefined(request.query.Date) && _.isUndefined(request.query.SmallType)) {
        const rawData = await this.ArangoManager.query(aql`
            FOR p IN ${collection}
            FILTER p.Date == ${request.query.Date}
            RETURN p
        `).then((cur) => cur.all()).then((d) => {
            return d;
        }).catch((err) => {
            throw err;
        });
        reply.send(_.sortBy(rawData, ['Time']));
    } else if (!_.isUndefined(request.query.Date) && !_.isUndefined(request.query.SmallType)) {
        const rawData = await this.ArangoManager.query(aql`
            FOR p IN ${collection}
            FILTER p.Date == ${request.query.Date}
            FILTER p.SmallType == ${request.query.SmallType}
            RETURN p
        `).then((cur) => cur.all()).then((d) => {
            return d;
        }).catch((err) => {
            throw err;
        });
        reply.send(_.sortBy(rawData, ['Time']));
    }
};

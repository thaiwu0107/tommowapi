// const _ = require('lodash');
// const moment = require('moment');

exports.q = async (request, reply) => {
    const qBigType = request.query.BigType.toString();
    const qDate = request.query.Date.toString();
    const qSmallType = request.query.SmallType.toString();
    const date = qDate ? `FILTER p.Date == ${data.date}` : '';
    const smallType = qSmallType ? `FILTER p.SmallType == ${data.SmallType}` : '';
    const rawData = await this.ArangoManager.query(aql`
        FOR p IN ${qBigType}
        ${smallType}
        ${date}
        RETURN p
    `).then((cur) => cur.all()).then((d) => {
        return d;
    }).catch((err) => {
        throw new StorageError(err);
    });
    reply.send(rawData);
};

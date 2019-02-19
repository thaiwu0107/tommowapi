// const _ = require('lodash');
// const moment = require('moment');

exports.test = async (request, reply) => {
    const data = request.body;
    const date = data.date ? `FILTER p.Date == ${data.date}` : '';
    const smallType = data.SmallType ? `FILTER p.SmallType == ${data.SmallType}` : '';
    const rawData = await this.ArangoManager.query(aql`
        FOR p IN ${data.BigType}
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

const _ = require('lodash');
const moment = require('moment');

const mappingBigType = ['wood', 'stone', 'flax', 'monster', 'product', 'unusual', 'weapon', 'arms'];
exports.test = async (request, reply) => {
    const db = this.ArangoManager;
    const data = request.query.d.toString();
    const d = _.split(data, ',');
    let BigType;
    let data;

    const rawObj = {};
    _.forEach(d, (adata) => {
        const rawData = _.split(adata, '@:');
        switch (rawData[0]) {
            case '@D':
                data = rawData[1];
                break;
            case '@T':
                rawObj.Time = rawData[1];
                break;
            case '@BT':
                BigType = mappingBigType[rawData[1]];
                rawObj.BigType = rawData[1];
                break;
            case '@ST':
                rawObj.SmallType = rawData[1];
                break;
            case '@C':
                rawObj.Cost = rawData[1];
                break;
        }
    });
    const collection = await db.collection(BigType);
    await collection.save(rawObj);
    reply.send('ok');
};

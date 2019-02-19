'use strict';

const arangojs = require('arangojs');
const Aigle = require('aigle');
Aigle.promisifyAll(arangojs);
// const GlobalHeartbeats = require('./GlobalHeartbeatsContext');

/**
 * 創建ArangoDB的Cluster
 * @static
 * @param {string[]} urlNodes 需要連線的Nodes
 * @param {number} arangoVersion 指定ArangoDB的版本
 * @param {string} user 使用者名稱
 * @param {string} password 使用者密碼
 * @param {number} maxSockets 最大同時可使用的連線數, 預設60
 * @param {booleam} keepAlive 是否保持連線, 預設true
 * @param {booleam} keepAliveMsecs 保持連線多久, 預設30秒
 */
exports.initializeCluster = async (
    urlNodes, arangoVersion, user, password, maxSockets = 60, keepAlive = true, keepAliveMsecs = 30000) => {
    return new Promise((resolve, reject) => {
        try {
            this.db = new arangojs.Database({
                url: urlNodes,
                arangoVersion,
                agentOptions: {maxSockets, keepAlive, keepAliveMsecs},
                loadBalancingStrategy: 'ROUND_ROBIN',
            });
            // 預設就是都使用Database
            this.db.useDatabase('Tommow');
            this.db.useBasicAuth(user, password);

            // // 每120秒同步連線Cluster Nodes, 如果Urls 有異動這個函數觸發之後才會真正連線到
            // GlobalHeartbeats.createEventAsync(1, 0, async () => {
            //     await this.db.acquireHostList();
            // });
            resolve();
        } catch (err) {
            reject(err);
        }
    });
};

/**
 * 取得DB Instance
 */
exports.getDB = () => {
    return this.db;
};

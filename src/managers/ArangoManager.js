'use strict';

const ArangoContext = require('../contexts/ArangoContext');

class ArangoManager {
    constructor() {
        this.db = ArangoContext.getDB();
    }

    async listCollections() {
        return this.db.listCollections();
    }
}

module.exports = ArangoManager;

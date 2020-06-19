const { Pool } = require('pg');
const patcher = require('node-postgres-named');

class BaseSqlDataService {

    constructor(options) {
        this.pool = patcher.patch(new Pool(options));
    }

    query() {
        return this.pool.query(query.template, query.values).then(result => result.rows);
    }
}

module.exports = { BaseSqlDataService };
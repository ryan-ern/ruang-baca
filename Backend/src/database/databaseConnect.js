const { Pool } = require('pg')

class Database {
    static async createConnection() {
        this.pool = new Pool({
            user: process.env.db_user,
            host: process.env.db_host,
            database: process.env.db_database,
            password: process.env.db_password,
            port: process.env.db_port,
            /*icreateTimeoutMillis: 8000,
            acquireTimeoutMillis: 8000,
            idleTimeoutMillis: 8000,
            reapIntervalMillis: 1000,
            createRetryIntervalMillis: 100,*/
        })
    }
    static async query(sql) {
        const result = await this.pool.query(sql)
        return result.rows
    }
    static async close() {
        try {
            return this.pool.end(() => { });
        } catch (error) {
            console.error('Error closing connection', error)
        }
    }
}

module.exports = Database
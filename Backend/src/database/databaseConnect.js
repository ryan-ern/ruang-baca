const {Client} = require('pg')

class Database{
    static async createConnection() {
        this.client = new Client({
          user: process.env.db_user,
          host: process.env.db_host,
          database: process.env.db_database,
          password: process.env.db_password,
          port: process.env.db_port,
        });
    
      await this.client.connect();
    }
    static async query(sql) {
      const result = await this.client.query(sql)
      return result.rows
    }
    static async close() {
        try {
          await this.client.end();
          console.log('Connection to PostgreSQL closed')
        } catch (error) {
          console.error('Error closing connection', error)
        }
    }
}

module.exports = Database
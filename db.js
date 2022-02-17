const {MongoClient} = require("mongodb");

class Db {
    static database;
    static client;

    static async setUp(uri) {
        if(!this.client) {
            await this.setClient(uri);
            await this.setConnection();
        }
        return this.database;
    }

    static async setConnection() {
        this.database = this.client.db("eloquence");
    }

    static async setClient(uri) {
        console.log("Connecting to database");
        const client = new MongoClient(uri);
        await client.connect();
        this.client = client;
    }
}

module.exports = Db;
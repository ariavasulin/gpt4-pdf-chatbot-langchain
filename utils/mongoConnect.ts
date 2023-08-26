const { MongoClient } = require('mongodb');

let cachedDb = null;

async function connectToDatabase(uri) {
    if (cachedDb) {
        return cachedDb;
    }
    console.log(uri)
    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    const db = await client.db(new URL(uri).pathname.substr(1)); // extract DB name from the URI

    cachedDb = db;
    return db;
}

module.exports = {
    connectToDatabase,
};
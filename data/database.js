
require('dotenv').config();
const {MongoClient} = require('mongodb');

let database;

const initDb = async (callback) => {
     const url = process.env.MONGODB_URL;
    if (database){
        console.log('Db is already initialized!');
        return callback(null, database);
    }
     try {
    const client = await MongoClient.connect(url);
    database = client.db(); // ✅ use client.db() not just client
    console.log('✅ MongoDB connected successfully');
    callback(null, database);
  } 
    catch (err) {
        callback(err);
    };
};

const getDatabase = () => {
    if (!database) {
        throw Error ('Database not initialized')
    }
    return database;
};

module.exports = {
    initDb,
    getDatabase
};
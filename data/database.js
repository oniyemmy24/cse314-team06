
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = async (callback) => {
    if (database){
        console.log('Db is already initialized!');
        return callback(null, database);
    }
     try {
    const client = new MongoClient(process.env.MONGODB_URL);
    database = client.db(process.env.project2); // ✅ use client.db() not just client
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
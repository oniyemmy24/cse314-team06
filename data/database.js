const { MongoClient } = require('mongodb');
let db;

const initDb = async (callback) => {
  if (db) {
    console.log('Database already initialized.');
    return callback(null, db);
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URL);
    db = client.db(); // ✅ This returns the actual DB instance
    console.log('Database connection successful.');
    callback(null, db);
  } catch (err) {
    callback(err);
  }
};

const getDatabase = () => {
  if (!db) {
    throw Error('Database not initialized');
  }
  return db; // ✅ return the database, NOT the client
};

module.exports = {
  initDb,
  getDatabase
};

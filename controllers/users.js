const mongodb= require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection('users').find(); // cursor
    const users = await result.toArray(); // ✅ correct
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users.' });
  }
};
const getSingle = async (req, res) => {
  try {
    const userId = ObjectId(req.params.id);
    const user = await mongodb.getDatabase().collection('users').findOne({ _id: userId }); // ✅ no .toArray()
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user' });
  }
};

module.exports = {
    getAll,
    getSingle
};

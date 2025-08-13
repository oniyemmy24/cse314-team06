const {ObjectId } = require('mongodb');
const mongodb= require('../data/database');

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
      try {
    const db = mongodb.getDatabase();
    const result = await db.collection('users').find();
    const users = await result.toArray();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
     try {
    const db = mongodb.getDatabase();
    const userId = new ObjectId(req.params.id);
    const result = await db.collection('users').find({ _id: userId });
    const users = await result.toArray();

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(users[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};


const createUser = async(req, res) => {
   //#swagger.tags=['Users']
     try {
    const db = mongodb.getDatabase();

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('users').insertOne(user);

    if (response.acknowledged) {
      res.status(201).json({ message: 'The contact was created successfully' });
    } else {
      res.status(500).json({ message: 'Failed to create contact' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};


const updateUser = async(req, res) => {
  //#swagger.tags=['Users']
 try {
    const db = mongodb.getDatabase();
    const userId = new ObjectId(req.params.id);

    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const response = await db.collection('users').replaceOne({ _id: userId }, user);

    if (response.modifiedCount > 0) {
      res.status(200).json({ message: 'The contact was updated successfully' });
    } else {
      res.status(404).json({ message: 'User not found or no changes made' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

const deleteUser = async(req, res) => {
  //#swagger.tags=['Users']
try {
    const db = mongodb.getDatabase();
    const userId = new ObjectId(req.params.id);

    const response = await db.collection('users').deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(200).json({ message: 'The contact was deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser

};

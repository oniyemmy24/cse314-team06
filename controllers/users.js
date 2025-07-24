const {ObjectId } = require('mongodb');
const mongodb= require('../data/database');

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
    const db = mongodb.getDatabase();
    const result = await db.collection('users').find(); 
    result.toArray().then((users) =>{
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
};
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
    const db = mongodb.getDatabase();
    const userId =  new ObjectId(req.params.id);
    const result = await db.collection('users').find({ _id: userId }); // ✅ no .toArray()
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    });
};

const createUser = async(req, res) => {
    const db = mongodb.getDatabase();
   //const userId = new ObjectId(req.params.id);
  //#swagger.tags=['Users']

  const user = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
    };
    const response = await db.collection('users').insertOne(user);
    if (response.acknowledged){
     //res.status(204).send();
    res.status(200).json({message:'The contact created successfully'});
    } else {
      res.status(500).json(response.error || 'some error occured while updating contacts');
    }
};

const updateUser = async(req, res) => {
  //#swagger.tags=['Users']
  const db = mongodb.getDatabase();
  const userId = new ObjectId(req.params.id);
  const user = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
    };
    const response = await db.collection('users').replaceOne({_id: userId}, user);
    if (response.modifiedCount > 0){
     res.status(200).json({message:'The contact was updated successfully'});
    } else {
      res.status(500).json(response.error || 'some error occured while updating contacts');
    }
};

const deleteUser = async(req, res) => {
  //#swagger.tags=['Users']
  const db = mongodb.getDatabase();
  const userId = new ObjectId(req.params.id);
    const response = await db.collection('users').deleteOne({_id: userId});
    if (response.deletedCount > 0){
     res.status(200).json({message:'The contact was deleted successfully'});
    } else {
      res.status(500).json(response.error || 'some error occured while updating contacts');
    }
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser

};

const ObjectId  = require('mongodb');
const mongodb= require('../data/database');

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
    const result = await mongodb.getDatabase().collection('users').find(); 
    result.toArray().then((users) =>{
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users);
    });
};
const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
    const userId =  new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('users').find({ _id: userId }); // ✅ no .toArray()
    result.toArray().then((users) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(users[0]);
    });
};

const createUser = async(req, res) => {
  //#swagger.tags=['Users']
  const user = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').insertOne(user);
    if (response.acknowledged){
     res.status(204).send();
    } else {
      res.status(500).json(response.error || 'some error occured while updating contacts');
    }
};

const updateUser = async(req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
  const user = { 
    userName: req.body.firstName,
    email: req.body.lastName,
    email: req.body.email,
    ipaddress: req.body.birthday
    };
    const response = await mongodb.getDatabase().db().collection('users').replaceOne({_id: userId}, user);
    if (result.modifiedCount > 0){
     res.status(204).send();
    } else {
      res.status(500).json(response.error || 'some error occured while updating contacts');
    }
};

const deleteUser = async(req, res) => {
  //#swagger.tags=['Users']
  const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('users').remove({_id: userId}, true);
    if (result.deletedCount > 0){
     res.status(204).send();
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

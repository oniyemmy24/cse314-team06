const db = require('../data/database');
const {  ObjectId } = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  const result = await db.getDatabase().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getContactById = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await db.getDatabase().db().collection('contacts').findOne({ _id: contactId });
  result.toArray().then((contacts) =>{
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => { 
  const contact = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
};
  const result = await db.getDatabase().db().collection('contacts').insertOne(contact);
  if (result.acknowledged){
    res.sendStatus(204).send();
} else {
  res.status(500).json(result.error ||'some error occured while updating the contacts');
}
};

const updateContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const contact = { 
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor, 
    birthday: req.body.birthday
    };
  const result = await db.getDatabase().db().collection('contacts').replaceOne({ _id: contactId }, contact);
  if (result.modifiedCount > 0){
  res.sendStatus(204).send();
} else {
    res.sendStatus(500).json(response.error || 'some error occured while updating contacts');
}
};

const deleteContact = async (req, res) => {
  const contactId = new ObjectId(req.params.id);
  const result = await db.getDatabase().db().collection('contacts').deleteOne({ _id: contactId }, true);
  res.sendStatus(result.deletedCount > 0 ? 204 : 404);
};

module.exports = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact
};

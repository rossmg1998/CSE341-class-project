const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const frontend = (req, res) => {
  jsonfile = require("../user.json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(jsonfile);
};

const mongo_getallBooks = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("brandon_mull_books");
    const data = collection.find();
    const result = await data.toArray();
    res.json(result);
  } catch {
    res.status(500).json(response.error || "Some error occurred while getting all books.");
  }
};

const mongo_getsingleBook = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to get a book.');
    }
    const id = new ObjectId(req.params.id);
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("brandon_mull_books");
    const data = collection.find({_id: id});
    const result = await data.toArray();
    res.json(result);
  } catch {
    res.status(500).json(response.error || "Some error occurred while getting a single book.");
  }
};

const createBook = async (req, res) => {
  try {
    const book = {
      title: req.body.title,
      series: req.body.series,
      genre: req.body.genre,
      publicationDate: req.body.publicationDate
    };
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("brandon_mull_books").insertOne(book);
    console.log(response);
  } catch {
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the book.");
    }
  }
};

const updateBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to update a book.');
    }
    const id = new ObjectId(req.params.id);
    const book = {
      title: req.body.title,
      series: req.body.series,
      genre: req.body.genre,
      publicationDate: req.body.publicationDate
    };
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("brandon_mull_books").replaceOne({_id: id}, book);
    console.log(response);
  } catch {
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the book.");
    }
  }
};

const deleteBook = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid book id to delete a book.');
    }  
    const id = new ObjectId(req.params.id);
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("brandon_mull_books").deleteOne({_id: id});
    console.log(response);
  } catch {
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the book.");
    }
  }
};

module.exports = {
  frontend, 
  mongo_getallBooks, 
  mongo_getsingleBook,
  createBook,
  updateBook,
  deleteBook
};
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const frontend = (req, res) => {
    jsonfile = require("../user.json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(jsonfile);
}

const mongo_getallBooks = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("brandon_mull_books");
    const data = collection.find();
    const result = await data.toArray();
    res.json(result);
}

const mongo_getsingleBook = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.params.id);
    const id = new ObjectId(req.params.id);
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("brandon_mull_books");
    const data = collection.find({_id: id});
    const result = await data.toArray();
    res.json(result);
}

const createBook = async (req, res) => {
    const book = {
      title: req.body.title,
      series: req.body.series,
      genre: req.body.genre,
      publicationDate: req.body.publicationDate
    };
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("brandon_mull_books").insertOne(book);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the book.");
    }
};

const updateBook = async (req, res) => {
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
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the book.");
    }
};

const deleteBook = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("brandon_mull_books").deleteOne({_id: id});
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the book.");
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
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const frontend = (req, res) => {
  jsonfile = require("../user.json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(jsonfile);
};

const mongo_getallMovies = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("harry_potter_movies");
    const data = collection.find();
    const result = await data.toArray();
    res.json(result);
  } catch {
    res.status(500).json(response.error || "Some error occurred while getting all movies.");
  }
};

const mongo_getsingleMovie = async (req, res) => {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.params.id);
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to get a movie.');
    }
    const id = new ObjectId(req.params.id);
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("harry_potter_movies");
    const data = collection.find({_id: id});
    const result = await data.toArray();
    res.json(result);
  } catch {
    res.status(500).json(response.error || "Some error occurred while getting a single movie.");
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      director: req.body.director,
      musicComposer: req.body.musicComposer,
      distributionCompany: req.body.distributionCompany,
      USreleaseDate: req.body.USreleaseDate,
      runningTime: req.body.runningTime,
      audienceRating: req.body.audienceRating
    };
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("harry_potter_movies").insertOne(movie);
    console.log(response);
  } catch {
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the movie.");
    }
  }
};

const updateMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to update a movie.');
    }  
    const id = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      director: req.body.director,
      musicComposer: req.body.musicComposer,
      distributionCompany: req.body.distributionCompany,
      USreleaseDate: req.body.USreleaseDate,
      runningTime: req.body.runningTime,
      audienceRating: req.body.audienceRating
    };
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("harry_potter_movies").replaceOne({_id: id}, movie);
    console.log(response);
  } catch {
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the movie.");
    }
  }
};

const deleteMovie = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid movie id to delete a movie.');
    }  
    const id = new ObjectId(req.params.id);
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("harry_potter_movies").deleteOne({_id: id});
    console.log(response);
  } catch {
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the movie.");
    }
  }
};

module.exports = {
  frontend, 
  mongo_getallMovies, 
  mongo_getsingleMovie,
  createMovie,
  updateMovie,
  deleteMovie
};
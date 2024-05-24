const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const frontend = (req, res) => {
    jsonfile = require("../user.json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(jsonfile);
}

const mongo_getallMovies = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("harry_potter_movies");
    const data = collection.find();
    const result = await data.toArray();
    res.json(result);
}

const mongo_getsingleMovie = async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    console.log(req.params.id);
    const id = new ObjectId(req.params.id);
    const client = new MongoClient(process.env.mongoDB_URI);
    await client.connect();
    const db = client.db();
    const collection = db.collection("harry_potter_movies");
    const data = collection.find({_id: id});
    const result = await data.toArray();
    res.json(result);
}

const createMovie = async (req, res) => {
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
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || "Some error occurred while creating the movie.");
    }
};

const updateMovie = async (req, res) => {
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
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while updating the movie.");
    }
};

const deleteMovie = async (req, res) => {
    const id = new ObjectId(req.params.id);
    const mongodb = new MongoClient(process.env.mongoDB_URI);
    await mongodb.connect();
    const response = await mongodb.db().collection("harry_potter_movies").deleteOne({_id: id});
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || "Some error occurred while deleting the movie.");
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
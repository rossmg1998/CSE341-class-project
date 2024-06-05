const router = require("express").Router();
const { requiresAuth } = require('express-openid-connect');
const moviesController = require("../controllers/harry-potter-movies")
const validation = require('../middleware/harry-potter-movies');

// router.get("/", moviesController.functionName);

router.get("/harry_potter_movies", moviesController.mongo_getallMovies);

router.get("/harry_potter_movies/:id", moviesController.mongo_getsingleMovie);

router.post("/harry_potter_movies", validation.saveMovie, moviesController.createMovie);

router.put("/harry_potter_movies/:id", validation.saveMovie, moviesController.updateMovie);

router.delete("/harry_potter_movies/:id", requiresAuth(), moviesController.deleteMovie);

module.exports = router;
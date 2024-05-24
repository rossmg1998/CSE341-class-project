const router = require("express").Router();

const moviesController = require("../controllers/harry-potter-movies")

// router.get("/", moviesController.functionName);

router.get("/harry_potter_movies", moviesController.mongo_getallMovies);

router.get("/harry_potter_movies/:id", moviesController.mongo_getsingleMovie);

router.post("/harry_potter_movies", moviesController.createMovie);

router.put("/harry_potter_movies/:id", moviesController.updateMovie);

router.delete("/harry_potter_movies/:id", moviesController.deleteMovie);

module.exports = router;
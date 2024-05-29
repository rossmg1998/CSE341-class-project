const router = require("express").Router();

const booksController = require("../controllers/brandon-mull-books")
const validation = require('../middleware/brandon-mull-books');

// router.get("/", booksController.functionName);

router.get("/brandon_mull_books", booksController.mongo_getallBooks);

router.get("/brandon_mull_books/:id", booksController.mongo_getsingleBook);

router.post("/brandon_mull_books", validation.saveBook, booksController.createBook);

router.put("/brandon_mull_books/:id", validation.saveBook, booksController.updateBook);

router.delete("/brandon_mull_books/:id", booksController.deleteBook);

module.exports = router;
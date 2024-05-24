const router = require("express").Router();

router.use('/brandon-mull-books.js', require('./brandon-mull-books.js'));
router.use('/harry-potter-movies.js', require('./harry-potter-movies.js'));

module.exports = router;
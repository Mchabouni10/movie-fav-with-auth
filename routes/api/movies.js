const express = require('express');
const router = express.Router();
const movieController = require('../../controllers/api/movies');


// Routes for movies


// GET /api/favorites
router.get('/', movieController.index);
// GET /api/favorites/id
router.get('/:id', movieController.show);

//post/api/movie
router.post('/', movieController.addMovie);

//PUT /api/movie
router.put('/:id', movieController.updateMovieById);


//DELETE /api/movie
router.delete('/:id', movieController.deleteMovieById);

module.exports = router;
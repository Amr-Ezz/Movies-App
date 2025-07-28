const express = require('express');
const movieController = require('../controllers/movieController');
const { validate } = require('../middlewares/validator');
const { movieValidationSchemas } = require('../schemas/movieSchemas');

const router = express.Router();

router.get('/', 
  validate(movieValidationSchemas.listMovies),
  movieController.getAllMovies
);

router.get('/:id', 
  validate(movieValidationSchemas.getMovie),
  movieController.getMovieById
);

router.post('/', 
  validate(movieValidationSchemas.createMovie),
  movieController.createMovie
);

router.put('/:id', 
  validate(movieValidationSchemas.updateMovie),
  movieController.updateMovie
);

router.delete('/:id', 
  validate(movieValidationSchemas.deleteMovie),
  movieController.deleteMovie
);

module.exports = router;
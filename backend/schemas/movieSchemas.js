const { z } = require('zod');

const createMovieBodySchema = z.object({
  title: z.string().min(1, 'Title is required').max(255, 'Title must be less than 255 characters'),
  type: z.enum(['Movie', 'TV Show']).default('Movie'),
  director: z.string().min(1, 'Director is required').max(255, 'Director must be less than 255 characters'),
  budget: z.string().max(100, 'Budget must be less than 100 characters').optional(),
  location: z.string().max(255, 'Location must be less than 255 characters').optional(),
  duration: z.string().max(100, 'Duration must be less than 100 characters').optional(),
  yearTime: z.string().max(100, 'Year/Time must be less than 100 characters').optional(),
  description: z.string().optional()
});

const updateMovieBodySchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(255, 'Title must be less than 255 characters').optional(),
  type: z.enum(['Movie', 'TV Show']).optional(),
  director: z.string().min(1, 'Director cannot be empty').max(255, 'Director must be less than 255 characters').optional(),
  budget: z.string().max(100, 'Budget must be less than 100 characters').optional(),
  location: z.string().max(255, 'Location must be less than 255 characters').optional(),
  duration: z.string().max(100, 'Duration must be less than 100 characters').optional(),
  yearTime: z.string().max(100, 'Year/Time must be less than 100 characters').optional(),
  description: z.string().optional()
});

const listMoviesQuerySchema = z.object({
  page: z.string().regex(/^\d+$/, 'Page must be a number').transform(Number).refine(val => val > 0, 'Page must be greater than 0').optional().default('1'),
  limit: z.string().regex(/^\d+$/, 'Limit must be a number').transform(Number).refine(val => val > 0 && val <= 100, 'Limit must be between 1 and 100').optional().default('10'),
  search: z.string().optional()
});

const movieIdParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, 'ID must be a number').transform(Number)
});


const movieValidationSchemas = {
  listMovies: {
    query: listMoviesQuerySchema
  },
  
  getMovie: {
    params: movieIdParamsSchema
  },
  
  createMovie: {
    body: createMovieBodySchema
  },
  
  updateMovie: {
    params: movieIdParamsSchema,
    body: updateMovieBodySchema
  },
  
  deleteMovie: {
    params: movieIdParamsSchema
  }
};


const createMovieSchema = createMovieBodySchema;
const updateMovieSchema = updateMovieBodySchema;
const queryMoviesSchema = listMoviesQuerySchema;
const movieIdSchema = movieIdParamsSchema;

module.exports = {
  movieValidationSchemas,
  createMovieBodySchema,
  updateMovieBodySchema,
  listMoviesQuerySchema,
  movieIdParamsSchema,
  createMovieSchema,
  updateMovieSchema,
  queryMoviesSchema,
  movieIdSchema
}; 
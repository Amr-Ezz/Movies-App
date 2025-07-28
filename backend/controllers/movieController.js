const { AppDataSource } = require('../config/database');
const { Movie } = require('../entities/Movie');

module.exports = {
  getAllMovies: async (req, res) => {
    try {
      const { page, limit, search } = req.query;
      
      const movieRepository = AppDataSource.getRepository(Movie);
      const queryBuilder = movieRepository.createQueryBuilder('movie');
      
      
      if (search) {
        queryBuilder.andWhere(
          '(movie.title LIKE :search OR movie.director LIKE :search OR movie.location LIKE :search OR movie.description LIKE :search)',
          { search: `%${search}%` }
        );
      }
      
      const skip = (page - 1) * limit;
      queryBuilder.skip(skip).take(limit);
      
      queryBuilder.orderBy('movie.createdAt', 'DESC');
      
      const [movies, total] = await queryBuilder.getManyAndCount();
      
      const totalPages = Math.ceil(total / limit);
      
      res.json({
        success: true,
        data: movies,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNext: page < totalPages,
          hasPrev: page > 1
        }
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching movies',
        error: error.message
      });
    }
  },
  
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const movieRepository = AppDataSource.getRepository(Movie);
      const movie = await movieRepository.findOne({ where: { id } });
      
      if (!movie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }
      
      res.json({
        success: true,
        data: movie
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error fetching movie',
        error: error.message
      });
    }
  },
  
  createMovie: async (req, res) => {
    try {
      const movieData = req.body;
      
      const movieRepository = AppDataSource.getRepository(Movie);
      const newMovie = movieRepository.create(movieData);
      const savedMovie = await movieRepository.save(newMovie);
      
      res.status(201).json({
        success: true,
        message: 'Movie created successfully',
        data: savedMovie
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error creating movie',
        error: error.message
      });
    }
  },
  
  updateMovie: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;
      
      const movieRepository = AppDataSource.getRepository(Movie);
      
      const existingMovie = await movieRepository.findOne({ where: { id } });
      if (!existingMovie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }
      
      await movieRepository.update(id, updateData);
      
      const updatedMovie = await movieRepository.findOne({ where: { id } });
      
      res.json({
        success: true,
        message: 'Movie updated successfully',
        data: updatedMovie
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error updating movie',
        error: error.message
      });
    }
  },
  
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params;
      
      const movieRepository = AppDataSource.getRepository(Movie);
      
      const existingMovie = await movieRepository.findOne({ where: { id } });
      if (!existingMovie) {
        return res.status(404).json({
          success: false,
          message: 'Movie not found'
        });
      }
      
      await movieRepository.delete(id);
      
      res.json({
        success: true,
        message: 'Movie deleted successfully'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error deleting movie',
        error: error.message
      });
    }
  }
};

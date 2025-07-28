const express = require('express');
const cors = require('cors');
const { config } = require('dotenv');
const serverlessExpress = require('@vendia/serverless-express');
const { AppDataSource } = require('./config/database');
const movieRoutes = require('./routes/movieRoutes');

config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/movies', movieRoutes);

app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

let serverlessHandler;

const setup = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
    console.log('Database connected');
  }
  serverlessHandler = serverlessExpress({ app });
};

setup();

module.exports = async (req, res) => {
  if (!serverlessHandler) {
    await setup();
  }
  return serverlessHandler(req, res);
};

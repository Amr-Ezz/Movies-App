const { DataSource } = require('typeorm');
const { Movie } = require('../entities/Movie');
const { config } = require('dotenv');

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT) || 5432,
  username: process.env.PGUSERNAME || 'root',
  password: process.env.PGPASSWORD || 'your_password',
  database: process.env.PGDATABASE || 'movies_db',
  ssl: {
    rejectUnauthorized: false
  },
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  entities: [Movie],
  migrations: [],
  subscribers: []
});

module.exports = { AppDataSource }; 
const { DataSource } = require('typeorm');
const { Movie } = require('../entities/Movie');
const { config } = require('dotenv');

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT) ,
  username: process.env.PGUSERNAME ,
  password: process.env.PGPASSWORD ,
  database: process.env.PGDATABASE ,
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
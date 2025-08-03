const { DataSource } = require("typeorm");
const { Movie } = require("../entities/Movie");
const { config } = require("dotenv");

config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || '5432', 10),
  username: process.env.PGUSERNAME,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,

  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [Movie],
  migrations: [],
  subscribers: [],
});
console.log({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSERNAME,
  database: process.env.PGDATABASE
});

module.exports = { AppDataSource };

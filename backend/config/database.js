const { DataSource } = require("typeorm");
const { Movie } = require("../entities/Movie");
const { config } = require("dotenv");

config();

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.PGHOST || process.env.DB_HOST || "localhost",
  port: parseInt(process.env.PGPORT || process.env.DB_PORT || "5432", 10),
  username: process.env.PGUSER || process.env.DB_USERNAME || "root",
  password: process.env.PGPASSWORD || process.env.DB_PASSWORD || "your_password",
  database: process.env.PGDATABASE || process.env.DB_DATABASE || "movies_db",
  synchronize: process.env.NODE_ENV === "development",
  logging: process.env.NODE_ENV === "development",
  entities: [Movie],
  migrations: [],
  subscribers: [],
});

module.exports = { AppDataSource };

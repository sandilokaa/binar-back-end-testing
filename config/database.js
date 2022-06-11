require("dotenv").config();

const config = new URL(
  process.env.DATABASE_URL ||
      `postgres://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@127.0.0.1:${process.env.DB_PORT}/${process.env.DB_NAME}`
);

const {
  DB_USER = config.username,
  DB_PASSWORD = config.password,
  DB_NAME = config.pathname.replace("/", ""),
  DB_HOST = config.hostname,
  DB_PORT = "5432",
} = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
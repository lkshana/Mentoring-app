const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,  // Database name
  process.env.DB_USER,  // Database username
  process.env.DB_PASS,  // Database password
  { 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Port should be inside the options object
    dialect: "mysql",
    logging: false,
  }
);

module.exports = sequelize;

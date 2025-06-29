const mysql = require("mysql2/promise");
require("dotenv").config();
const sequelize = require("../config/db");



async function initializeDatabase() {
  try {
    console.log("DB Password:", process.env.DB_PASS);

    // Create connection without selecting database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
    });

    // Create database if not exists
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`
    );
    console.log(`Database '${process.env.DB_NAME}' checked/created.`);

    // Close the initial connection
    await connection.end();

    // Sync models in correct order
    console.log("Syncing database...");
    await sequelize.sync({ alter: true }); // Use { alter: true } to keep data

    console.log("✅ All tables were dropped and re-synced successfully.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error initializing database:", error);
    process.exit(1);
  }
}

initializeDatabase();

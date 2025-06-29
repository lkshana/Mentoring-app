// models/Admin.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the "Admin" model to represent teachers/HODs with authority over student entries
const Admin = sequelize.define(
  "Admin",
  {
    // Unique identifier for admin
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // Admin's full name
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Admin's email must be unique
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // Password field (store hashed values)
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Optional: department for which the admin is responsible
    department: {
      type: DataTypes.ENUM("AI&DS", "CSE", "CIVIL", "EEE", "ECE", "IT", "MECH"),
      allowNull: true,
    },
  },
  {
    tableName: "admins", // Database table name for admins
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Admin;

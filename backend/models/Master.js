// models/Master.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the "Master" model to represent higher-level authority (e.g., secretaries and principals)
const Master = sequelize.define(
  "Master",
  {
    // Unique identifier for master-level users
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // Full name field
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Email should be unique in the system
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // Password field (store a hashed password)
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Role within the master category: could be 'secretary' or 'principal'
    role: {
      type: DataTypes.ENUM("secretary", "principal", "placement_officer"),
      allowNull: false,
    },
  },
  {
    tableName: "masters",  // Database table name for master users
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Master;

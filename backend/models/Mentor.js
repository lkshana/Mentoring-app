//mentor.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define the "Mentor" model
const Mentor = sequelize.define(
  "Mentor",
  {
    mentor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    department: {
      type: DataTypes.ENUM("AI&DS", "CSE", "CIVIL", "EEE", "ECE", "IT","MECH"),
      allowNull: false,
    },

  },
  {
    tableName: "mentors", 
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Mentor;
// models/Student.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Your database connection

// Define the "Student" model with fields including personal details and additional academic fields
const Student = sequelize.define(
  "Student",
  {
    // Primary key for internal use (auto-incrementing integer)
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    // Registration number; unique string identifier for each student
    reg_no: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    // Student's full name
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    // Gender using an ENUM type
    gender: {
      type: DataTypes.ENUM("male", "female", "other"),
      allowNull: true,
    },
    // Father's name
    fathers_name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    // Date of Birth (using DATEONLY to store only the date)
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    // Residential address as text
    residential_address: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Email address; must be unique for login purposes
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    // Mobile number field
    mobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // Parents’ mobile number field
    parents_mobile_no: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // Aadhar Card number or any other government identifier
    aadhar_card_no: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    // Hashed password for authentication
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Academic department using an ENUM of available departments
    department: {
      type: DataTypes.ENUM("AI&DS", "CSE", "CIVIL", "EEE", "ECE", "IT", "MECH"),
      allowNull: true,
    },
    // Academic year as an ENUM (I, II, III, IV)
    year: {
      type: DataTypes.ENUM("I", "II", "III", "IV"),
      allowNull: true,
    },
    // Section information
    section: {
      type: DataTypes.ENUM("A", "B", "Not Applicable"),
      allowNull: true,
    },
    // Cumulative Grade Point Average
    cgpa: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    // Short biography for the student
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // Portfolio
    portfolio: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // GitHub profile link
    github_profile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // LinkedIn profile link
    linkedin_profile: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // URL to the profile picture
    profile_picture: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    // Flag for account verification
    is_verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // Token for verifying email or other operations (if needed)
    verification_token: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "students",   // Explicit table name in the database
    timestamps: true,        // Automatically add created_at and updated_at timestamps
    createdAt: "created_at", // Custom field name for creation timestamp
    updatedAt: "updated_at", // Custom field name for update timestamp
  }
);
  
module.exports = Student;

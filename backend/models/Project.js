//project.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Mentor = require("./Mentor");

// Define the "Project" model
const Project = sequelize.define(
  "Project",
  {
    // Unique project ID
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // Title of the project
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    // Description of the project
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // GitHub repository URL
    github_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },

    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    // Associated mentor's ID
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Mentor,
        key: "mentor_id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "projects", // Table name
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    defaultScope: {
      where: {
        is_deleted: false,
      },
    },
    scopes: {
      withDeleted: {
        where: {
          is_deleted: false,
        },
      },
      deleted: {
        where: {
          is_deleted: true,
        },
      },
    },
  }
);

module.exports = Project;

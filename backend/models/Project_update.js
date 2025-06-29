const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Project = require("./Project");

const ProjectUpdate = sequelize.define(
  "ProjectUpdate",
  {
    update_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Project,
        key: "project_id",
      },
      onDelete: "CASCADE",
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    review_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    review: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "project_updates",
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

module.exports = ProjectUpdate;

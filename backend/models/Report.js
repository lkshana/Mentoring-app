const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Project = require("./Project");
const Mentor = require("./Mentor");

const Report = sequelize.define(
  "Report",
  {
    report_id: {
      type: DataTypes.BIGINT,
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
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "reports",
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

module.exports = Report;

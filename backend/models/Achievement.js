const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");

const Achievement = sequelize.define(
  "Achievement",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        "certificate",
        "online_course",
        "project",
        "internship",
        "paper_presentation",
        "hackathon"
      ),
      allowNull: false,
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
    specialization: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    issued_by: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    issued_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    approved_by_department: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    approved_by_placement: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "achievements",
    timestamps: false,
  }
);




module.exports = Achievement;


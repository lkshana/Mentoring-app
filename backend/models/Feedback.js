const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Student = require("./Student");
const Project = require("./Project");
const Mentor = require("./Mentor");

const Feedback = sequelize.define(
  "Feedback",
  {
    feedback_id: {
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
    mentor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Mentor,
        key: "mentor_id",
      },
      onDelete: "CASCADE",
    },
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
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
    tableName: "feedback",
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
    hooks: {
      beforeValidate: (feedback, options) => {
        if (feedback.mentor_id === null && feedback.student_id === null) {
          throw new Error(
            "A feedback must have either a mentor_id or a student_id."
          );
        }
      },
    },
  }
);

module.exports = Feedback;


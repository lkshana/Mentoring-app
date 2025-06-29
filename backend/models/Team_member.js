//team_members.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Registration = require("./Registration");
const Event = require("./Event");
const Student = require("./Student");

// Define the "TeamMember" model
const TeamMember = sequelize.define(
  "TeamMember",
  {
    // Unique ID for the Team member record
    team_member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    registration_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Registration,
        key: "registration_id",
      },
      onDelete: "CASCADE",
    },
    // Student's ID
    student_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Student,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    tableName: "team_members", // Table name in DB
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

module.exports = TeamMember;

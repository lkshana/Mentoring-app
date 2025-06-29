const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Registration = sequelize.define(
    "Registration",
    {
        registration_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        event_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Event",
                key: "event_id",
            },
            onDelete: "CASCADE",
        },
        teal_lead_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "Student",
                key: "id",
            },
            onDelete: "CASCADE",
        },
        mentor_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Mentor",
                key: "mentor_id",
            },
            onDelete: "CASCADE",
        },
        updates: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        idea_title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        idea_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        approve_by_department:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        approve_by_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        tableName: "registration",
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


module.exports = Registration;
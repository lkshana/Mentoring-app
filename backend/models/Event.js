const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Master = require("./Master");


const Event = sequelize.define(
    "Event",
    {
        event_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        event_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        poster: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        event_type: {
            type: DataTypes.ENUM(
                "External",
                "Internal"
            )
        },
        category: {
            type: DataTypes.ENUM(
                "Workshop",
                "Seminar",
                "Conference",
                "Hackathon",
                "Other"
            )
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        created_by: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Master,
                key: "id",
            },
            onDelete: "CASCADE",
        },
    },
    {
        tableName: "events",
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
)

module.exports = Event;
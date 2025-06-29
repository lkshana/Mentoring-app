'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      event_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      event_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      poster: {
        type: Sequelize.TEXT,
        allowNull: false,
      },

      link: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      event_type: {
        type: Sequelize.ENUM("External", "Internal"),
        allowNull: true,
      },

      category: {
        type: Sequelize.ENUM("Workshop", "Seminar", "Conference", "Hackathon", "Other"),
        allowNull: true,
      },

      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'masters', // table name for Master model
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Drop enum types first to avoid issues on rollback
    await queryInterface.dropTable('events');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_events_event_type";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_events_category";');
  }
};

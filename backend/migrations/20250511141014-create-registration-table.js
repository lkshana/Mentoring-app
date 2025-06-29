'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('registration', {
      registration_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',      // physical table for Event
          key: 'event_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      teal_lead_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',    // physical table for Student
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'mentors',     // physical table for Mentor
          key: 'mentor_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      updates: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      idea_title: {
        type: Sequelize.STRING(255),
        allowNull: true,
      },

      idea_description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      approve_by_department: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      approve_by_admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },

      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
    await queryInterface.dropTable('registration');
  }
};

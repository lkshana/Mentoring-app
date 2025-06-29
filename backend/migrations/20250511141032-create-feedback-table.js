'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('feedback', {
      feedback_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',      // table name for Project model
          key: 'project_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'mentors',       // table name for Mentor model
          key: 'mentor_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      student_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'students',      // table name for Student model
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
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

      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('feedback');
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      project_id: {
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

      github_url: {
        type: Sequelize.STRING(500),
        allowNull: true,
      },

      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',      // table name for Student model
          key: 'id',
        },
        onUpdate: 'CASCADE',
      },

      mentor_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'mentors',       // table name for Mentor model
          key: 'mentor_id',
        },
        onUpdate: 'CASCADE',
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
    // Drop the ENUM type for mentor department first if you need, otherwise: 
    await queryInterface.dropTable('projects');
  },
};
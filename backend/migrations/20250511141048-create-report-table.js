'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('reports', {
      report_id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',      // physical table name for Project
          key: 'project_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },

      content: {
        type: Sequelize.TEXT,
        allowNull: false,
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
    await queryInterface.dropTable('reports');
  }
};

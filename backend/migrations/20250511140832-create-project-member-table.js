'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('project_members', {
      project_member_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      project_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'projects',  // table name for Project model
          key: 'project_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students',  // table name for Student model
          key: 'id',
        },
        onDelete: 'CASCADE',
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
    await queryInterface.dropTable('project_members');
  }
};

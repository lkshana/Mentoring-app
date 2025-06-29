'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('team_members', {
      team_member_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      registration_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'registration', // Make sure this matches your actual table name
          key: 'registration_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },

      student_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'students', // Match with actual Student table name
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
    await queryInterface.dropTable('team_members');
  }
};

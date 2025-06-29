'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      approved_by: {
        allowNull: true,
        type: Sequelize.ENUM('placement', 'department')
      },
      type: {
        allowNull: true,
        type: Sequelize.ENUM(
          'certificate',
          'online_course',
          'project',
          'internship',
          'paper_presentation',
          'hackathon'
        )
      },
      admin_id: {
        allowNull: true,
        onDelete: 'SET NULL',
        references: {
          key: 'id',
          model: 'admins'
        },
        type: Sequelize.INTEGER
      },
      student_id: {
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          key: 'id',
          model: 'students'
        },
        type: Sequelize.INTEGER
      },
      achievement_id: {
        allowNull: true,
        onDelete: 'CASCADE',
        references: {
          key: 'id',
          model: 'achievements'
        },
        type: Sequelize.BIGINT
      },
      timestamp: {
        defaultValue: Sequelize.NOW,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('logs');
  }
};


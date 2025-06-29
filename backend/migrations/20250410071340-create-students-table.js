'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reg_no: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "other"),
        allowNull: true
      },
      fathers_name: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: true
      },
      residential_address: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true
      },
      mobile: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      parents_mobile_no: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      aadhar_card_no: {
        type: Sequelize.STRING(20),
        allowNull: true
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      department: {
        type: Sequelize.ENUM("AI&DS", "CSE", "CIVIL", "EEE", "ECE", "IT", "MECH"),
        allowNull: true
      },
      year: {
        type: Sequelize.ENUM("I", "II", "III", "IV"),
        allowNull: true
      },
      section: {
        type: Sequelize.ENUM("A", "B", "Not Applicable"),
        allowNull: true
      },
      cgpa: {
        type: Sequelize.FLOAT,
        allowNull: true
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      portfolio: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      github_profile: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      linkedin_profile: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      profile_picture: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      verification_token: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('students');
  }
};


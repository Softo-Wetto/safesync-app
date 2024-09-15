'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Activities', 'outcome', {
      type: Sequelize.ENUM('C', 'NC', 'N/A', 'U/V'),
      allowNull: false,
      defaultValue: 'C'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Activities', 'outcome');
  }
};
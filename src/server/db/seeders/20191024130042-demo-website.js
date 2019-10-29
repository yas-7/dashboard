'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Websites', [{
      name: 'habr.com',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'medium.com',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Websites', null, {});
  }
};

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Authors', [{
      name: 'Egor Rogov',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Alexey Kazakov',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Authors', null, {});
  }
};

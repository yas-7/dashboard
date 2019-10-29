'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        'Articles',
        'AuthorId',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Authors',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
      queryInterface.addColumn(
        'Articles',
        'WebsiteId', 
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Websites',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn(
        'Articles',
        'AuthorId'
      ),
      queryInterface.removeColumn(
        'Articles',
        'WebsiteId'
      ),
    ]);
  }
};

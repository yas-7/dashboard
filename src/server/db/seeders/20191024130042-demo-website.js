module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Websites', [{
    name: 'habr.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }, {
    name: 'medium.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Websites', null, {}),
};

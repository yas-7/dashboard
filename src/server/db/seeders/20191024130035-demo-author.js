module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Authors', [{
    name: 'Egor Rogov',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    name: 'Alexey Kazakov',
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Authors', null, {}),
};

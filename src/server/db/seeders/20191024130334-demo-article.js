'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const authors = await queryInterface.sequelize.query(
      `SELECT id from Authors;`,  { type: queryInterface.sequelize.QueryTypes.SELECT}
    );
    const websites = await queryInterface.sequelize.query(
      `SELECT id from Websites;`,  { type: queryInterface.sequelize.QueryTypes.SELECT}
    );

    return queryInterface.bulkInsert('Articles', [{
      title: 'Indexes in PostgreSQL — 4 (Btree)',
      url: 'https://habr.com/en/company/postgrespro/blog/443284',
      description: "We will now consider B-tree, the most traditional and widely used index.",
      body: "B-tree index type, implemented as «btree» access method, is suitable for data that can be sorted. In other words, «greater», «greater or equal», «less», «less or equal», and «equal» operators must be defined for the data type.",
      authorId: authors[0].id,
      websiteId: websites[0].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      title: "Functional components with React Hooks. Why it's better?",
      url: 'https://habr.com/en/post/443500/',
      description: "When React.js 16.8 was released we got the opportunity to use React Hooks.",
      body: "Let's imagine a component rendering a simple form. It can be something showing us a few inputs and allow us to change it's values.",
      authorId: authors[1].id,
      websiteId: websites[1].id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Articles', null, {});
  }
};

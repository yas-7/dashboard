const Sequelize = require('sequelize');
const db = require('./db/models');

const { Author, Website, Article } = db;

exports.configureRoutes = (server) => server.route([{
  method: 'GET',
  path: '/api/authors',
  handler: (request) => {
    const {
      limit,
      offset,
      orderBy = 'id',
      direction = 'asc',
      searchBy,
      searchValue,
    } = request.query;
    const searchOptions = searchBy && searchValue && Sequelize.where(
      Sequelize.col(searchBy),
      Sequelize.Op.like,
      `%${searchValue}%`
    );
    return Author.findAndCountAll({
      offset,
      limit,
      order: [[ Sequelize.col(orderBy), direction ]],
      where: searchOptions || null,
    });
  },
}, {
  method: 'GET',
  path: '/api/authors/{id}',
  handler: async (request) => Author.findByPk(request.params.id),
}, {
  method: 'POST',
  path: '/api/authors',
  handler: (request) => Author.create(request.payload.author),
}, {
  method: 'PUT',
  path: '/api/authors/{id}',
  handler: async (request) => {
    const author = await Author.findByPk(request.params.id);
    author.update(request.payload.author);
    return author.save();
  },
}, {
  method: 'DELETE',
  path: '/api/authors/{id}',
  handler: async (request) => {
    const author = await Author.findByPk(request.params.id);
    const articles = await author.getArticles();
    if (articles.length > 0) {
      return { error: 'Author has related articles!' };
    }
    return author.destroy();
  },
}, {
  method: 'GET',
  path: '/api/articles',
  handler: (request) => {
    const {
      limit,
      offset,
      orderBy = 'id',
      direction = 'asc',
      searchBy,
      searchValue,
    } = request.query;
    const searchOptions = searchBy && searchValue && Sequelize.where(
      Sequelize.col(searchBy),
      Sequelize.Op.like,
      `%${searchValue}%`
    );
    return Article.findAndCountAll({
      attributes: [
        [ Sequelize.col('article.id'), 'id' ],
        'title',
        'description',
        'body',
        'url',
      ],
      include: [
        { model: Author },
        { model: Website },
      ],
      offset,
      limit,
      order: [[ Sequelize.col(orderBy), direction ]],
      where: searchOptions || null,
    });
  },
}, {
  method: 'GET',
  path: '/api/articles/{id}',
  handler: (request) => Article.findByPk(
    request.params.id,
    { include: [{ model: Author }, { model: Website }] }
  ),
}, {
  method: 'POST',
  path: '/api/articles',
  handler: async (request) => {
    const author = await Author.findByPk(request.payload.article.AuthorId);
    const website = await Website.findByPk(request.payload.article.WebsiteId);
    const article = Article.build(request.payload.article);
    await article.setAuthor(author);
    await article.setWebsite(website);
    await article.save();
    return { ...article.get(), Author: author, Website: website };
  },
}, {
  method: 'PUT',
  path: '/api/articles/{id}',
  handler: () => Website.findAll(),
}, {
  method: 'DELETE',
  path: '/api/articles/{id}',
  handler: async (request) => {
    const article = await Article.findByPk(request.params.id);
    return article.destroy();
  },
}, {
  method: 'GET',
  path: '/api/websites',
  handler: (request) => {
    const {
      limit,
      offset,
      orderBy = 'id',
      direction = 'asc',
      searchBy,
      searchValue,
    } = request.query;
    const searchOptions = searchBy && searchValue && Sequelize.where(
      Sequelize.col(searchBy),
      Sequelize.Op.like,
      `%${searchValue}%`
    );
    return Website.findAndCountAll({
      offset,
      limit,
      order: [[ Sequelize.col(orderBy), direction ]],
      where: searchOptions || null,
    });
  },
}, {
  method: 'GET',
  path: '/api/websites/{id}',
  handler: async (request) => Website.findByPk(request.params.id),
}, {
  method: 'POST',
  path: '/api/websites',
  handler: (request) => Website.create(request.payload.website),
}, {
  method: 'PUT',
  path: '/api/websites/{id}',
  handler: async (request) => {
    const website = await Website.findByPk(request.params.id);
    website.update(request.payload.website);
    return website.save();
  },
}, {
  method: 'DELETE',
  path: '/api/websites/{id}',
  handler: async (request) => {
    const website = await Website.findByPk(request.params.id);
    const articles = await website.getArticles();
    if (articles.length > 0) {
      return { error: 'Website has related articles!' };
    }
    return website.destroy();
  },
},
]);

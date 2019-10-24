const db = require('../models');
const Sequelize = require('sequelize');

const Author= db.Author;
const Website= db.Website;
const Article= db.Article;

exports.configureRoutes = (server) => {
    return server.route([{
      method: 'GET',
      path: '/api/authors',
      handler: () => {
        return Author.findAll()
      }
    }, {
      method: 'GET',
      path: '/api/authors/{id}',
      handler: async (request) => {
        return Author.findByPk(request.params.id)
      }
    }, {
      method: 'POST',
      path: '/api/authors',
      handler: (request) => {
        return Author.create(request.payload.author)
      }
    }, {
      method: ['PUT', 'PATCH'],
      path: '/api/authors/{id}',
      handler: async (request) => {
        const author = await Author.findByPk(request.params.id)
        author.update(request.payload.author)
  
        return author.save()
      }
    }, {
      method: 'DELETE',
      path: '/api/authors/{id}',
      handler: async (request) => {
        const author = await Author.findByPk(request.params.id)
        
        return author.destroy()
      }
    }, {
      method: 'GET',
      path: '/api/articles',
      handler: request => {
        const {
          limit,
          offset,
          order_by = 'id',
          direction = 'asc',
          search_by,
          search_value
        } = request.query;
        const search_options = search_by && search_value && {[search_by]: { [Sequelize.Op.like]: `%${search_value}%` }} || null;
        
        return Article.findAll({
          attributes: [
            [Sequelize.col('article.id'), 'id'],
            'title',
            'description',
            'body',
            'url',
            'authorId',
            'websiteId',
            [Sequelize.col('author.name'), 'author_name'],
            [Sequelize.col('website.name'), 'website_name']
          ],
          include: [
            { model: Author, attributes: [] },
            { model: Website, attributes: [] }
          ],
          offset,
          limit,
          order: [[Sequelize.col(order_by), direction]],
          where: search_options
        });
      }
    }, {
      method: 'GET',
      path: '/api/articles/{id}',
      handler: (request) => {
        return Article.findByPk(request.params.id, {
          include: [{model: Author}, {model: Website}]
        })
      }
    }, {
      method: 'POST',
      path: '/api/articles',
      handler: async (request) => {
        const author = await Author.findByPk(request.payload.authorId)
        const website = await Website.findByPk(request.payload.websiteId)
        const article = Article.build(request.payload.article)
        await article.setAuthor(author)
        await article.setWebsite(website)
        return article.save()
      }
    }, {
      method: ['PUT', 'PATCH'],
      path: '/api/articles/{id}',
      handler: async (request) => {
        const article = await Article.findByPk(request.params.id)
        article.update(request.payload.article)
        return article.save()
      }
    }, {
      method: 'DELETE',
      path: '/api/articles/{id}',
      handler: async (request) => {
        const article = await Article.findByPk(request.params.id)
        return article.destroy()
      }
    }, {
      method: 'GET',
      path: '/api/websites',
      handler: () => {
        return Website.findAll()
      }
    }, {
      method: 'GET',
      path: '/api/websites/{id}',
      handler: async (request) => {
        return Website.findByPk(request.params.id)
      }
    }, {
      method: 'POST',
      path: '/api/websites',
      handler: (request) => {
        return Website.create(request.payload.website)
      }
    }, {
      method: ['PUT', 'PATCH'],
      path: '/api/websites/{id}',
      handler: async (request) => {
        const website = await Website.findByPk(request.params.id)
        website.update(request.payload.website)
        return website.save()
      }
    }, {
      method: 'DELETE',
      path: '/api/websites/{id}',
      handler: async (request) => {
        const website = await Website.findByPk(request.params.id)
        return website.destroy()
      }
    },
  ])
  }
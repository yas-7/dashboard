const Lab = require('@hapi/lab');
const { expect } = require('@hapi/code');

const { afterEach, beforeEach, describe, it } = exports.lab = Lab.script();
const { init } = require('../src/server/server');
const db = require('../src/server/db/models');

const Author = db.Author;
const Website = db.Website;
const Article = db.Article;

describe('api endpoints test', () => {
  let server;
  beforeEach(async () => {
    server = await init();
    Author.destroy({ where: {}, truncate: true });
    Website.destroy({ where: {}, truncate: true });
    Article.destroy({ where: {}, truncate: true });
  });

  afterEach(async () => {
    await server.stop();
  });

  const data = {
    websiteName: 'habr.com',
    changedWebsiteName: 'habr.ru',
    authorName: 'Alexey Kazakov',
    changedAuthorName: 'Alexey Kazachenko',
    title: 'Indexes in PostgreSQL — 4 (Btree)',
    url: 'https://habr.com/en/company/postgrespro/blog/443284',
    description: "We've already discussed PostgreSQL indexing engine and interface of access methods, as well as hash index, one of access methods.",
    changedTitle: 'Indexes in PostgreSQL',
  };

  it('should create, return and change website', async () => {
    const createWebsite = await server.inject({
      method: 'POST',
      url: '/api/websites',
      payload: { website: { name: data.websiteName } },
    });

    const id = createWebsite.result.id;
    const getWebsite = await server.inject({
      method: 'GET',
      url: `/api/websites/${id}`,
    });
    expect(getWebsite.statusCode).to.equal(200);
    expect(getWebsite.result.name).to.equal(data.websiteName);

    const changeWebsite = await server.inject({
      method: 'PUT',
      url: `/api/websites/${id}`,
      payload: { website: { name: data.changedWebsiteName } },
    });
    expect(changeWebsite.statusCode).to.equal(200);
    expect(changeWebsite.result.name).to.equal(data.changedWebsiteName);
  });


  it('should create, return and change author', async () => {
    const createAuthor = await server.inject({
      method: 'POST',
      url: '/api/authors',
      payload: { author: { name: data.authorName } },
    });

    const id = createAuthor.result.id;

    const getAuthor = await server.inject({
      method: 'GET',
      url: `/api/authors/${id}`,
    });
    expect(getAuthor.statusCode).to.equal(200);
    expect(getAuthor.result.name).to.equal(data.authorName);

    const changeAuthor = await server.inject({
      method: 'PUT',
      url: `/api/authors/${id}`,
      payload: { author: { name: data.changedAuthorName } },
    });
    expect(changeAuthor.statusCode).to.equal(200);
    expect(changeAuthor.result.name).to.equal(data.changedAuthorName);
  });


  it('should create, return and change article', async () => {
    const createWebsite = await server.inject({
      method: 'POST',
      url: '/api/websites',
      payload: { website: { name: data.websiteName } },
    });
    const websiteId = createWebsite.result.id;

    const createAuthor = await server.inject({
      method: 'POST',
      url: '/api/authors',
      payload: { author: { name: data.authorName } },
    });
    const authorId = createAuthor.result.id;

    const createArticle = await server.inject({
      method: 'POST',
      url: '/api/articles',
      payload: {
        websiteId,
        authorId,
        article: {
          title: data.title,
          url: data.url,
          description: data.description,
        },
      },
    });

    const id = createArticle.result.id;

    const getArticle = await server.inject({
      method: 'GET',
      url: `/api/articles/${id}`,
    });

    expect(getArticle.statusCode).to.equal(200);
    expect(getArticle.result.title).to.equal(data.title);
    expect(getArticle.result.Author.id).to.equal(authorId);
    expect(getArticle.result.Website.id).to.equal(websiteId);

    const changeArticle = await server.inject({
      method: 'PUT',
      url: `/api/articles/${id}`,
      payload: { article: { title: data.changedTitle } },
    });
    expect(changeArticle.statusCode).to.equal(200);
    expect(changeArticle.result.title).to.equal(data.changedTitle);
  });


});

const Hapi = require('@hapi/hapi');
const Path = require('path');
const Inert = require('@hapi/inert');
const { configureRoutes } = require('./routes');

const server = Hapi.server({
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'localhost',
  routes: { files: { relativeTo: Path.join(__dirname, '../../dist') } },
});

configureRoutes(server);

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.register(Inert);
  server.route([
    {
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: '.',
          redirectToSlash: true,
          index: true,
        },
      },
    },
    {
      method: 'GET',
      path: '/authors',
      handler: (_, h) => h.file('index.html'),
    },
    {
      method: 'GET',
      path: '/websites',
      handler: (_, h) => h.file('index.html'),
    },
  ]);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

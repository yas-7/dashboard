const Hapi = require('@hapi/hapi');
const { configureRoutes } = require('./routes');

const server = Hapi.server({
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'localhost'
});

configureRoutes(server);

exports.init = async () => {
  await server.initialize();
  return server;
};

exports.start = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
  return server;
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});
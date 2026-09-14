const app = require('./app');
const env = require('./config/env');

const server = app.listen(env.port, () => {
  console.log(`Server running at http://localhost:${env.port}`);
});

process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught exception:', error);
  process.exit(1);
});
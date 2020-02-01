const express = require('express');
const config = require('./config');
const loaders = require('./loaders');
const Logger = require('./loaders/logger');

async function startServer() {

  const app = express();

  await loaders(app);
  // await expressLoader(app);

  app.listen(config.port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️ 
      ################################################
    `);
  });
}

startServer();


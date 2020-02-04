const express = require('express');
const config = require('./src/config');
const loaders = require('./src/loaders');
const Logger = require('./src/loaders/logger');

async function startServer() {

  const app = express();
  
  app.use('/public/', express.static('./src/public'))

  await loaders(app);
  // await expressLoader(app);

  const port = config.port || 3000
  app.listen(port, (err) => {
    if (err) {
      Logger.error(err);
      process.exit(1);
      return;
    }
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${port} 🛡️ 
      ################################################
    `);
  });
}

startServer();


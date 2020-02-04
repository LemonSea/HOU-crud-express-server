/**
 * 该文件已启用，改为 server.js 作为启动文件
 * 原因：拿不到 public 的静态文件
 */

const express = require('express');
const config = require('./config');
const loaders = require('./loaders');
const Logger = require('./loaders/logger');

async function startServer() {

  const app = express();

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


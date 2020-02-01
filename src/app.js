const express = require('express');
const config = require('./config');
const expressLoader = require('./loaders/express');
const loaders = require('./loaders');

async function startServer() {

  const app = express();

  await loaders(app);
  // await expressLoader(app);

  app.listen(config.port, (err) => {
    if (err) {
      return err;
    }
    console.dir(`server run on prot localhost://${config.port}`);
  });
}

startServer();


const express = require('express');
const config = require('./config');
const expressLoader = require('./loaders/express');

async function startServer() {

  const app = express();

  await expressLoader(app);

  app.listen(config.port, (err) => {
    if (err) {
      return err;
    }
    console.dir(`server run on prot localhost://${config.port}`);
  });
}

startServer();

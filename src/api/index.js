const Router = require('express').Router;
// const user = require('./routes/user');
// const admin = require('./routes/admin');
// const auth = require('./routes/auth');
const fs = require('fs');
const path = require('path');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();

  // 动态路由导入加载
  fs.readdir(path.join(__dirname, './routes'), (err, files) => {
    files.forEach(fileName => {
      const name = fileName.replace(/(.*\/)*([^.]+).*/ig, "$2");

      eval(`const ${name} = require('./routes/${fileName}'); ${name}(app)`);
    });
  });

  // user(app);
  // admin(app);
  // auth(app);

  return app
}
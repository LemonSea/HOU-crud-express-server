const Router = require('express').Router;
const user = require('./routes/user');
const admin = require('./routes/admin');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  
  user(app);
  admin(app);
  
	return app
}
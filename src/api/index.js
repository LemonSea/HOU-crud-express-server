const Router = require('express').Router;
const user = require('./routes/user');
const admin = require('./routes/admin');
const auth = require('./routes/auth');

// guaranteed to get dependencies
module.exports = () => {
  const app = Router();
  
  user(app);
  admin(app);
  auth(app);
  
	return app
}
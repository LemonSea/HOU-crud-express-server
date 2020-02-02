const UserService = require('../../services/UserService');
const middlewares = require('../middlewares');
const Container = require("typedi").Container;
const route = require('express').Router();

module.exports = (app) => {

  app.use('/users', route);

  // route.get('/me', (req, res) => {
  //   return res.status(200).json(
  //     {
  //       code: 200,
  //       message: 'success',
  //       data: {}
  //     }
  //   );
  // });

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req, res) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.post(
    '/findById',
    async (req, res, next) => {
      try {
        const _id = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.FindUserById(_id);
        return res.json(user).status(200);
      } catch (e) {
        return next(e);
      }
    })

  route.post(
    '/add',
    async (req, res, next) => {
      try {
        const userDTO = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.AddUser(userDTO);
        return res.json(user).status(200);
      } catch (e) {
        return next(e);
      }
    })

}

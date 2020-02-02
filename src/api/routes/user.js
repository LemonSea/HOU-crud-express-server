const UserService = require('../../services/UserService');
const middlewares = require('../middlewares');
const Container = require("typedi").Container;
const route = require('express').Router();

const logger = global.logger;

module.exports = (app) => {

  app.use('/users', route);

  // 在这里启动身份验证
  route.use(middlewares.isAuth, middlewares.attachCurrentUser);

  // 获取当前 token 记录信息
  route.get('/me', (req, res, next) => {
    try {
      return res.json({ user: req.currentUser }).status(200);
    } catch (e) {      
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.get(
    '/allUser',
    async (req, res, next) => {
      try {
        const userServiceInstance = Container.get(UserService);
        const { list } = await userServiceInstance.FindAllUser();
        return res.json(list).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  route.post(
    '/findById',
    async (req, res, next) => {
      try {
        const _id = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.FindUserById(_id);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  route.post(
    '/findOneByParam',
    async (req, res, next) => {
      try {
        const param = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.FindOneUserByParam(param);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  route.post(
    '/findAllByParam',
    async (req, res, next) => {
      try {
        const param = req.body;
        const userServiceInstance = Container.get(UserService);
        const { list } = await userServiceInstance.FindAllUserByParam(param);
        return res.json(list).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
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
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })
}

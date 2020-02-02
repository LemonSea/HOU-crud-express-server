const UserService = require('../../services/UserService');
const middlewares = require('../middlewares');
const Container = require("typedi").Container;
const route = require('express').Router();

const logger = global.logger;

module.exports = (app) => {

  app.use('/users', route);

  // 在这里启动身份验证
  route.use(middlewares.isAuth, middlewares.attachCurrentUser);

  route.get('/me', (req, res, next) => {
    try {
      return res.json({ user: req.currentUser }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });

  route.post(
    '/addOneUser',
    async (req, res, next) => {
      try {
        const userDTO = req.body;
        console.log(userDTO)
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.AddOneUser(userDTO);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  route.get(
    '/findAllUser',
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
        const user = await userServiceInstance.FindUserById(_id);
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
    '/updateById',
    async (req, res, next) => {
      try {
        const { _id, param: update } = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.UpdateOneUserById(_id, update);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

  route.post(
    '/updateOneByParam',
    async (req, res, next) => {
      try {
        const { query, param: update } = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.UpdateOneUserByParam(query, update);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

  route.post(
    '/updateAllByParam',
    async (req, res, next) => {
      try {
        const { query, param: update } = req.body;
        const userServiceInstance = Container.get(UserService);
        const { record } = await userServiceInstance.UpdateAllUserByParam(query, update);
        return res.json(record).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

  route.post(
    '/deleteById',
    async (req, res, next) => {
      try {
        const { _id } = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.DeleteOneUserById(_id);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

  route.post(
    '/deleteAllByIds',
    async (req, res, next) => {
      try {
        console.log(req.body)
        const { ids } = req.body;
        console.log(ids)
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.DeleteAllUserByIds(ids);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

  route.post(
    '/deleteOneByParam',
    async (req, res, next) => {
      try {
        const { param } = req.body;
        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.DeleteOneUserByParam(param);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

}

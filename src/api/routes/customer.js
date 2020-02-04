const UserService = require('../../services/UserService');
const middlewares = require('../middlewares');
const Container = require("typedi").Container;
const { celebrate, Joi, errors } = require('celebrate');
const route = require('express').Router();
const { IUserCreate } = require('../../interfaces/IUser');

const logger = global.logger;

module.exports = (app) => {

  app.use('/customer', route);

  // 在这里启动身份验证
  route.use(middlewares.isAuth, middlewares.attachCurrentUser);

  // 获取当前用户
  // 请不要修改这个方法，这个方法获取当前用户更安全
  route.get('/me', (req, res, next) => {
    try {
      return res.json({ user: req.currentUser }).status(200);
    } catch (e) {
      logger.error('🔥 error: %o', e);
      return next(e);
    }
  });


  /**
   * 获取用户
   * 不传参数就是获取所有用户
   * http://localhost:3000/api/customer
   * 传递参数就是根据条件获取用户
   * http://localhost:3000/api/customer?_id=111
   * 通过 req.query 获取 get 的参数
   * 注意，条件不能是 _id，如果要用 _id，请使用专门的方法
   */
  route.get(
    '/',
    async (req, res, next) => {
      try {
        const param = req.query;
        console.log(param)
        const userServiceInstance = Container.get(UserService);
        const { list } = await userServiceInstance.FindAllUserByParam(param);
        return res.json(list).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  // 根据 id 获取用户
  // 通过 req.params 获取内容
  // http://localhost:3000/api/customer/[id]
  route.get(
    '/:_id',
    async (req, res, next) => {
      try {
        // 你可以打印查看 req.params 的内容
        const _id = req.params;
        console.log(_id)

        const userServiceInstance = Container.get(UserService);
        const user = await userServiceInstance.FindUserById(_id);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  // 创建一个用户
  route.post(
    '/',
    // 后台的数据验证是必须的
    celebrate({
      // body 表明验证的是 body 中的内容
      body: Joi.object(IUserCreate),
    }),
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
    }
  )

  // 根据 id 修改用户
  // 通过 req.body 获取内容
  route.put(
    '/',
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

  // 传入一个 _id 或一个 ids（Array）
  // 根据 id 进行删除
  route.delete(
    '/',
    async (req, res, next) => {
      try {
        const { ids = null, _id = null } = req.body;
        if (ids !== null && _id !== null) {
          let err = new Error("不能同时传入 ids 和 _id！");
          err.status = 400;
          throw err;
        } else if (ids !== null) {
          const userServiceInstance = Container.get(UserService);
          const { user } = await userServiceInstance.DeleteAllUserByIds(ids);
          return res.json(user).status(200);
        } else if (_id !== null) {
          const userServiceInstance = Container.get(UserService);
          const { user } = await userServiceInstance.DeleteOneUserById(_id);
          return res.json(user).status(200);
        }        
        return res.json({}).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    }
  )

  // 当使用服务端验证（celebrate）的时候，必须加上这个
  app.use(errors());
}

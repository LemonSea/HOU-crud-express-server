const UserService = require('../../services/UserService');
const Container = require("typedi").Container;
const route = require('express').Router();

module.exports = (app) => {

  app.use('/users', route);

  route.get('/me', (req, res) => {
    return res.status(200).json(
      {
        code: 200,
        message: 'success',
        data: {}
      }
    );
  });

  route.post('/user',
    async (req, res, next) => {
      const userDTO = req.body;
      // console.log(userDTO)

      const userServiceInstance = Container.get(UserService);
      const { name, password } = await userServiceInstance.Signup(userDTO);

      // 返回一个响应到客户端
      return res.json({ name, password });
    })

  /**
   * add user
   */
  route.post('/add',
    async (req, res, next) => {
      try {
        const userDTO = req.body;
        // console.log(userDTO);

        const userServiceInstance = Container.get(UserService);
        const { user } = await userServiceInstance.AddUser(userDTO);
        console.log(user)

        return res.json( user ).status(200);
        
      } catch (e) {
        
        return next(e);
      }
    })

}

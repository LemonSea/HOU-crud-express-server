const UserService = require('../../services/UserService');
const Container = require("typedi").Container;

module.exports = (app) => {
  app.post('/user', 
  async (req, res, next) => {
    const userDTO = req.body;
    console.log(userDTO)
    
    const userServiceInstance = Container.get(UserService);
    const { name, password } = await userServiceInstance.Signup(userDTO);

    const data = {
      code: 20,
      message: 'Success',
      data: {
        name: 'user'
      }
    }

     // 返回一个响应到客户端
    return res.json({ name, password });
    // res.status(200).json(userDTO)
  })
}

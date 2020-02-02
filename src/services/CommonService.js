const User = require('../models/user')

module.exports = class UserService {
  constructor() {
   }

  async AddUser(user) {
    const result = await new User(user).save();

    return { user: result };
  }

  async FindUserById(_id) {
    const result = await User.findById(_id)
    return { user: result };
  }

  /**
   * 创建新内容
   * @param {model} model 对应的创建模型
   * @param {Object}} param 对应模型的参数对象
   */
  async Create(model, param) {
    return await new model(param).save();
  }

  async FindAll(model) {

  }

  /**
   * 根据 id 查找
   * @param {model} model 查找的model
   * @param {ObjectId} _id 要查找的 _id
   */
  async FindById(model, _id) {
    return await model.findById(_id);
  }  

  /**
   * 根据条件查找一个
   * @param {model} model 查找的 model
   * @param {Object} param 参数对象,Object
   */
  async FindOne(model, param) {    
    return await model.findOne(param);
  }
}
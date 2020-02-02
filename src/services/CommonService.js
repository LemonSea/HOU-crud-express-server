const User = require('../models/user')

module.exports = class UserService {
  constructor() {
  }

  /**
   * 创建新内容
   * @param {model} model 对应的创建模型
   * @param {Object}} param 对应模型的参数对象
   */
  async CreateOne(model, param) {
    return await new model(param).save();
  }

  /**
   * 查询所有
   * @param {model} model 要查询的model
   */
  async FindAll(model) {
    return model.find();
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
   * @param {Object} param param type of Object
   */
  async FindOneByParam(model, param) {
    return await model.findOne(param);
  }

  /**
   * 根据条件查找所有
   * @param {model} model 查找的 model
   * @param {Object} param param type of Object
   */
  async FindAllByParam(model, param) {    
    return await model.find(param);
  }

  /**
   * 根据条件删除一个
   * @param {model} model 删除的 model
   * @param {Object} param param type of Object
   */
  async DeleteOneByParam(model, param) {
    return await model.findOneAndRemove(param)
  }

  /**
   * 根据条件删除所有
   * @param {model} model 删除对应的 model
   * @param {Object} param param type of Object
   */
  async DeleteAllByParam(model, param) {
    return await model.remove(param);
  }

  /**
   * 根据 _id 删除一个
   * @param {model} model 删除的 model
   * @param {ObjectId} _id 对应的 _id
   */
  async DeleteOneById(model, _id) {
    return await model.findOneAndRemove(_id);
  }


}
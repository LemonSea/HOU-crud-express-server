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
   * 根据 id 查找一个,返回数据
   * @param {model} model 查找的model
   * @param {ObjectId} _id 要查找的 _id
   */
  async FindById(model, _id) {
    return await model.findById(_id);
  }

  /**
     * 根据条件查找一个，返回数据
     * @param {model} model 查找的 model
     * @param {Object} query param type of Object
     */
  async FindOneByParam(model, query) {
    return await model.findOne(query);
  }

  /**
     * 根据条件查找所有，返回数据
     * @param {model} model 查找的 model
     * @param {Object} query param type of Object
     */
  async FindAllByParam(model, query) {
    return await model.find(query);
  }

  /**
   * 查询所有，返回数据
   * @param {model} model 要查询的model
   */
  async FindAll(model) {
    return model.find();
  }

  /**
   * 根据 _id 修改一条数据,返回新数据
   * @param {model} model 要修改的模型
   * @param {ObjectId} _id 要修改数据的 _id
   * @param {Object} update 要修改的内容
   */
  async UpdateOneById(model, _id, update) {
    return await model.findByIdAndUpdate(_id, update, {
      new: true
    });
  }

  /**
   * 根据 _id 修改一条数据,返回旧数据
   * @param {model} model 要修改的模型
   * @param {ObjectId} _id 要修改数据的 _id
   * @param {Object} update 要修改的内容
   */
  async UpdateOneByIdOld(model, _id, update) {
    return await model.findByIdAndUpdate(_id, update);
  }

  /**
   * 根据条件修改一个,返回修改后的数据
   * @param {model} model 要修改的模型
   * @param {Object} query 查找要修改数据的条件
   * @param {Object} update 要修改的内容
   */
  async UpdateOneByParam(model, query, update) {
    return await model.findOneAndUpdate(query, update, {
      new: true
    })
  }

  /**
   * 根据条件修改一个,返回修改前的数据
   * @param {model} model 要修改的模型
   * @param {Object} query 查找要修改数据的条件
   * @param {Object} update 要修改的内容
   */
  async UpdateOneByParamOld(model, query, update) {
    return await model.findOneAndUpdate(query, update)
  }

  /**
   * 根据条件修改所有,返回修改的结果
   * @param {model} model 要修改的模型
   * @param {Object} query 查找要修改数据的条件
   * @param {Object} update 要修改的内容
   */
  async UpdateAllByParam(model, query, update) {
    return await model.updateMany(query, update)
  }

   /**
     * 根据 _id 删除一个
     * @param {model} model 删除的 model
     * @param {ObjectId} _id 对应的 _id
     */
    async DeleteOneById(model, _id) {
      return await model.findOneAndRemove(_id);
    }
  
    /**
     * 根据条件删除一个
     * @param {model} model 删除的 model
     * @param {Object} query param type of Object
     */
    async DeleteOneByParam(model, query) {
      return await model.findOneAndRemove(query)
    }
  
    /**
     * 根据条件删除所有
     * @param {model} model 删除对应的 model
     * @param {Object} query query type of Object
     */
    async DeleteAllByParam(model, query) {
      return await model.remove(query);
    }
}
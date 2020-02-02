module.exports = class UserService {
  constructor() {
  }

  /**
   * 创建一条新内容
   * @param {model} model 对应的创建模型
   * @param {Object}} param 对应模型的参数对象
   */
  async CreateOne(model, param) {
    return await new model(param).save();
  }

  /**
   * 根据 id 查找一条记录,返回数据
   * @param {model} model 查找的model
   * @param {ObjectId} _id 要查找的 _id
   */
  async FindById(model, _id) {
    return await model.findById(_id);
  }

  /**
     * 根据条件查找一条记录，返回数据
     * @param {model} model 查找的 model
     * @param {Object} query param type of Object
     */
  async FindOneByParam(model, query) {
    return await model.findOne(query);
  }

  /**
     * 根据条件查找所有记录，返回数据
     * @param {model} model 查找的 model
     * @param {Object} query param type of Object
     */
  async FindAllByParam(model, query) {
    return await model.find(query);
  }

  /**
   * 查询所有记录，返回数据
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
   * 根据条件修改一条记录,返回修改后的数据
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
   * 根据条件修改一条记录,返回修改前的数据
   * @param {model} model 要修改的模型
   * @param {Object} query 查找要修改数据的条件
   * @param {Object} update 要修改的内容
   */
  async UpdateOneByParamOld(model, query, update) {
    return await model.findOneAndUpdate(query, update)
  }

  /**
   * 根据条件修改所有记录,返回修改的结果
   * @param {model} model 要修改的模型
   * @param {Object} query 查找要修改数据的条件
   * @param {Object} update 要修改的内容
   */
  async UpdateAllByParam(model, query, update) {
    return await model.updateMany(query, update)
  }

  /**
    * 根据 _id 删除一条记录,返回删除的内容
    * @param {model} model 删除的 model
    * @param {ObjectId} _id 对应的 _id
    */
  async DeleteById(model, _id) {
    return await model.findOneAndRemove({ _id });
  }

  /**
   * 根据条件删除一条记录,返回删除的数据
   * @param {model} model 删除的 model
   * @param {Object} query param type of Object
   */
  async DeleteOneByParam(model, query) {
    return await model.findOneAndRemove(query)
  }

  /**
   * 根据 ids 数组删除数据，返回删除的结果
   * @param {model} model 删除的数据
   * @param {Array} ids _id 数组
   */
  async DeleteAllByIds(model, ids) {
    return await model.remove({ _id: { $in: ids } });
  }
}
const UserModel = require('../models/user')
const CommonService = require('./CommonService');

module.exports = class UserService extends CommonService {
  constructor() {
    super();
  }

  async AddUser(user) {
    const result = await new UserModel(user).save();
    return { user: result };
  }

  async FindAllUser() {
    const result = await this.FindAll(UserModel);
    return { list: result };
  }

  async FindUserById(_id) {
    const userRecord = await this.FindById(UserModel, _id);

    // 在返回的内容中删除保密内容。
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user };
  }

  async FindOneUserByParam(param) {
    const userRecord = await this.FindOneByParam(UserModel, param);
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user };
  }

  async FindAllUserByParam(param) {
    const result = await this.FindAllByParam(UserModel, param);
    return { list: result };
  }

}
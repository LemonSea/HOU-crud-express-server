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

  async FindUserById(_id) {
    const userRecord = await this.FindById(UserModel, _id);

    // 在返回的内容中删除保密内容。
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user };
  }

  async FindOneUserByParam(query) {
    const userRecord = await this.FindOneByParam(UserModel, query);
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user };
  }

  async FindAllUserByParam(query) {
    const userRecordList = await this.FindAllByParam(UserModel, query);

    const userList = [];
    userRecordList.forEach(userRecord => {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      userList.push(user);
    });

    return { list: userList };
  }

  async FindAllUser() {
    const userRecordList = await this.FindAll(UserModel);

    const userList = [];
    userRecordList.forEach(userRecord => {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      userList.push(user);
    });

    return { list: userList };
  }
  
  async UpdateOneUserById(_id, update) {
    const userRecord = await this.UpdateOneById(UserModel, _id, update);
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user: user };
  }

  async UpdateOneUserByParam(param, update) {
    const userRecord = await this.UpdateOneByParam(UserModel, param, update);
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user: user };
  }

  async UpdateAllUserByParam(param, update) {
    const userRecord = await this.UpdateAllByParam(UserModel, param, update);
    // const user = userRecord.toObject();
    // Reflect.deleteProperty(user, 'password');
    // Reflect.deleteProperty(user, 'salt');
    console.log(userRecord)
    return { user: userRecord };
  }

}
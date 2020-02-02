const UserModel = require('../models/user')
const CommonService = require('./CommonService');

module.exports = class UserService extends CommonService {
  constructor() {
    super();
  }

  async AddOneUser(userDTO) {
    const userRecord = await this.CreateOne(UserModel, userDTO);
    if (userRecord) {
      // 在返回的内容中删除保密内容。
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    }
    return { user: {} }
  }

  async FindUserById(_id) {
    const userRecord = await this.FindById(UserModel, _id);
    if (userRecord) {
      // 在返回的内容中删除保密内容。
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    }
    return { user: {} }
  }

  async FindOneUserByParam(query) {
    const userRecord = await this.FindOneByParam(UserModel, query);
    if (userRecord) {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user };
    }
    return { user: {} }
  }

  async FindAllUserByParam(query) {
    const userRecordList = await this.FindAllByParam(UserModel, query);
    if (userRecordList) {
      const userList = [];
      userRecordList.forEach(userRecord => {
        const user = userRecord.toObject();
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        userList.push(user);
      });
      return { list: userList };
    }
    return { list: {} };
  }

  async FindAllUser() {
    const userRecordList = await this.FindAll(UserModel);
    if (userRecordList) {
      const userList = [];
      userRecordList.forEach(userRecord => {
        const user = userRecord.toObject();
        Reflect.deleteProperty(user, 'password');
        Reflect.deleteProperty(user, 'salt');
        userList.push(user);
      });
      return { list: userList };
    }
    return { list: {} }
  }

  async UpdateOneUserById(_id, update) {
    const userRecord = await this.UpdateOneById(UserModel, _id, update);
    if (userRecord) {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user: user };
    }
    return { user: {} };
  }

  async UpdateOneUserByParam(param, update) {
    const userRecord = await this.UpdateOneByParam(UserModel, param, update);
    const user = userRecord.toObject();
    Reflect.deleteProperty(user, 'password');
    Reflect.deleteProperty(user, 'salt');
    return { user: user };
  }

  async UpdateAllUserByParam(param, update) {
    const record = await this.UpdateAllByParam(UserModel, param, update);
    // const user = userRecord.toObject();
    // Reflect.deleteProperty(user, 'password');
    // Reflect.deleteProperty(user, 'salt');
    return { record };
  }

  async DeleteOneUserById(_id) {
    const userRecord = await this.DeleteById(UserModel, _id);
    if (userRecord) {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user: user };
    }
    return { user: {} }
  }

  async DeleteOneUserByParam(param) {
    const userRecord = await this.DeleteOneByParam(UserModel, param);
    if (userRecord) {
      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user: user };
    }
    return { user: {} }
  }

  async DeleteAllUserByIds(ids) {
    const userRecord = await this.DeleteAllByIds(UserModel, ids);
    if (userRecord) {
      // const user = userRecord.toObject();
      // Reflect.deleteProperty(user, 'password');
      // Reflect.deleteProperty(user, 'salt');
      return { user: userRecord };
    }
    return { user: {} }
  }

}
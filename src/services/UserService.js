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
    const result = await this.FindById(UserModel, _id);
    return { user: result };
  }

}
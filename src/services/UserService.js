const User = require('../models/user')

module.exports = class UserService {
  constructor() { }

  async AddUser(user) {
    const result = await new User(user).save();

    return { user: result };
  }

  async FindUserById(_id) {
    const result = await User.findById(_id)
    return { user: result };
  }

}
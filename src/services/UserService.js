const User = require('../models/user')

module.exports = class UserService {
  constructor() { }

  async Signup(user) {
    // 这里使用发布订阅模式来完成所有的业务代码
    const userName = user.name;
    const companyPassword = user.password;

    return { name: userName, password: companyPassword };
  }

  async AddUser(user) {
    const rseult = await new User(user).save();

    return { user: rseult };
  }
}
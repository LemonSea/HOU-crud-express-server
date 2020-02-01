const User = require('../models/user')

module.exports = class AuthService {
  constructor() { }

  async SignIn(phone, password) {
    const userRecord = await User.findOne({ phone });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    // password 验证
    if (userRecord.password === password) {
      return { user: userRecord };
    } else {
      throw e;
    }
  }

}
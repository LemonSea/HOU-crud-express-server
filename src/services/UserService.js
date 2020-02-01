var Container = require("typedi").Container;

module.exports = class UserService {

  async Signup(user) {
    const userName = user.name;
    const companyPassword = user.password;

    return { name: userName, password: companyPassword };
  }
}
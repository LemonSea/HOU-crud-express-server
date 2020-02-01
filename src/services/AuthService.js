const User = require('../models/user')
const logger = require('../loaders/logger');
const config = require('../config');
const jwt = require('jsonwebtoken');

module.exports = class AuthService {
  constructor() { }

  async SignIn(phone, password) {
    const userRecord = await User.findOne({ phone });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    // // password 验证
    // if (userRecord.password === password) {
    //   return { user: userRecord };
    // } else {
    //   throw e;
    // }
    /**
     * We use verify from argon2 to prevent 'timing based' attacks
     */
    logger.silly('Checking password');
    // const validPassword = await argon2.verify(userRecord.password, password);
    const validPassword = userRecord.password === password;
    if (validPassword) {
      logger.silly('Password is valid!');
      logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      /**
       * Easy as pie, you don't need passport.js anymore :)
       */
      return { user, token };
    } else {
      throw new Error('Invalid Password');
    }
  }

  generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */
    logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
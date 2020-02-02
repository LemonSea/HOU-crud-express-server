const UserModel = require('../models/user')
const logger = require('../loaders/logger');
const config = require('../config');
const CommonService = require('./CommonService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = class AuthService extends CommonService {
  constructor() {
    super();
   }

  // success
  async SignUp(userInputDTO) {
    try {

      logger.silly('Hashing password');

      //生成salt的迭代次数
      const saltRounds = 8;
      //随机生成salt
      const salt = await bcrypt.genSalt(saltRounds);
      //获取hash值
      const hashedPassword = await bcrypt.hash(userInputDTO.password, salt);
      // const hashedPassword = await argon2.hash(userInputDTO.password, { salt });
      logger.silly('Creating user db record');
      console.log(this.Create)
      const userRecord = await this.Create(UserModel,{
        ...userInputDTO,
        salt: salt.toString('hex'),
        password: hashedPassword,
      });
      
      logger.silly('Generating JWT');
      const token = this.generateToken(userRecord);

      if (!userRecord) {
        throw new Error('User cannot be created');
      }
      // 重复任务，发送电子邮件
      // logger.silly('Sending welcome email');
      // await this.mailer.SendWelcomeEmail(userRecord);

      // eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

      const user = userRecord.toObject();
      Reflect.deleteProperty(user, 'password');
      Reflect.deleteProperty(user, 'salt');
      return { user, token };
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  // success
  async SignIn(phone, password) {
    // const userRecord = await UserModel.findOne({ phone });
    const userRecord = await this.FindOne(UserModel, { phone });
    if (!userRecord) {
      throw new Error('User not registered');
    }

    /**
     * verify by bcryptjs
     */
    logger.silly('Checking password');
    
    const validPassword = bcrypt.compareSync(password, userRecord.password);
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

  // Token 生成
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
        role: user.roleId,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret,
    );
  }
}
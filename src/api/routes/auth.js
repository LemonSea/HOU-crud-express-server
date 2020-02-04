const AuthService = require('../../services/AuthService');
const middlewares = require('../middlewares');
const { Container } = require("typedi");
const { Router } = require('express');
const { celebrate, Joi, errors } = require('celebrate');
const { IUserCreate } = require('../../interfaces/IUser');

// const logger = require('../../loaders/logger'); 
const logger = global.logger;

const route = Router();

module.exports = (app) => {

  app.use('/auth', route);

  route.post(
    '/signUp',
    celebrate({
      body: Joi.object(IUserCreate),
    }),
    async (req, res, next) => {
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body)
      console.log(req.headers)
      try {
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignUp(req.body);
        return res.status(201).json({ user, token });
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    },
  );

  route.post(
    '/signIn',
    celebrate({
      body: Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {
      logger.debug('Calling Sign-In endpoint with body: %o', req.body)
      try {
        const { phone, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.SignIn(phone, password);
        return res.json({ user, token }).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

  route.post('/logout', middlewares.isAuth, (req, res, next) => {
    logger.debug('Calling Sign-Out endpoint with body: %o', req.body)
    try {
      //@TODO AuthService.Logout(req.user) do some clever stuff
      return res.status(200).end();
    } catch (e) {
      logger.error('🔥 error %o', e);
      return next(e);
    }
  });

  app.use(errors());
}

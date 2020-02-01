const AuthService = require('../../services/AuthService');
const { Container } = require("typedi");
const { Router } = require('express');
const { celebrate, Joi } = require('celebrate');

const logger = require('../../loaders/logger'); 

const route = Router();

module.exports = (app) => {

  app.use('/auth', route);

  route.post(
    '/signIn',
    celebrate({
      body: Joi.object({
        phone: Joi.string().required(),
        password: Joi.string().required(),
      }),
    }),
    async (req, res, next) => {   
      logger.debug('Calling Sign-Up endpoint with body: %o', req.body )
      try {
        const { phone, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user } = await authServiceInstance.SignIn(phone, password);
        return res.json(user).status(200);
      } catch (e) {
        logger.error('🔥 error: %o', e);
        return next(e);
      }
    })

}

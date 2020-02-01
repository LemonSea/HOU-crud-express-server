const AuthService = require('../../services/AuthService');
const Container = require("typedi").Container;
const route = require('express').Router();
const { celebrate, Joi } = require('celebrate');

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
      try {
        const { phone, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        console.log(phone, password)
        const { user } = await authServiceInstance.SignIn(phone, password);
        return res.json(user).status(200);
      } catch (e) {
        return next(e);
      }
    })

}

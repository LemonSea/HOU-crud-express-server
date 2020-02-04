const { Joi } = require('celebrate');

const IUserCreate = {
  name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
  password: Joi.string().required(),
}

module.exports = {
  IUserCreate
}
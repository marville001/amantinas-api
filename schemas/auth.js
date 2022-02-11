const Joi = require("joi");

module.exports = {
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
  registerSchema: Joi.object().keys({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};
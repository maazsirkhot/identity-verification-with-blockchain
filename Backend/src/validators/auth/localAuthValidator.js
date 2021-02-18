const Joi = require('joi');
const validators = require('../index');

module.exports = {
  signup: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      username: Joi.string().required(),
      password: Joi.string().min(8).required(),
      isClient: Joi.string().valid('T', 'F'),
    });

    validators.validateRequestBody(req, next, schema);
  },
  login: (req, res, next) => {
    const schema = Joi.object({
      username: Joi.string().required(),
      password: Joi.string().min(8).required(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

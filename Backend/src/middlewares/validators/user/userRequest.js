const Joi = require('joi');
const validators = require('../index');

module.exports = {
  getUserRequest: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  requestAction: (req, res, next) => {
    const schema = Joi.object({
      action: Joi.string().valid('APPROVED', 'REJECTED').required(),
      expiry: Joi.object(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

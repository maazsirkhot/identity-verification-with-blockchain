const Joi = require('joi');
const validators = require('../index');

module.exports = {
  userDataFields: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  postsForUser: (req, res, next) => {
    const schema = Joi.object({
      option: Joi.string().valid('CURRENT', 'EXPIRED', 'ALL').required(),
    });

    validators.validateQueryParam(req, next, schema);
  },
};

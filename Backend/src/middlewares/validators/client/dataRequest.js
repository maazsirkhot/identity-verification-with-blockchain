const Joi = require('joi');
const validators = require('../index');

module.exports = {
  newRequest: (req, res, next) => {
    const schema = Joi.object({
      user: Joi.object().required(),
      fieldsRequested: Joi.array().required(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

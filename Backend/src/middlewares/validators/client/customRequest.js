const Joi = require('joi');
const validators = require('../index');

module.exports = {
  newRequest: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      fieldsAdded: Joi.array().required(),
    });

    validators.validateRequestBody(req, next, schema);
  },
  updateRequest: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().required(),
      fieldsAdded: Joi.array().required(),
      client: Joi.object().required(),
    });
    validators.validateRequestBody(req, next, schema);
  },
};

const Joi = require('joi');
const validators = require('../index');

module.exports = {
  newRequest: (req, res, next) => {
    const schema = Joi.object({
      user: Joi.object().required(),
      fieldsRequested: Joi.array().required(), // Check out dataRequest model in MongoDB
    });

    validators.validateRequestBody(req, next, schema);
  },
  fetchRequests: (req, res, next) => {
    const schema = Joi.object({
      clientId: Joi.object().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  requestRole: (req, res, next) => {
    const schema = Joi.object({
      user: Joi.object().required(),
      roleRequested: Joi.string().required(), // Provide Role ID only
    });

    validators.validateRequestBody(req, next, schema);
  },
};

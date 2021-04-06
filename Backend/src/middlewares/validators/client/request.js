const Joi = require('joi');
const validators = require('../index');

module.exports = {
  newRequest: (req, res, next) => {
    const schema = Joi.object({
      user: Joi.object().required(),
      fieldsRequested: Joi.array().required(), // Check out dataRequest model in MongoDB
      comment: Joi.string().optional(),
    });

    validators.validateRequestBody(req, next, schema);
  },
  requestRole: (req, res, next) => {
    const schema = Joi.object({
      user: Joi.object().required(),
      roleRequested: Joi.string().required(), // Provide Role ID only
    });

    validators.validateRequestBody(req, next, schema);
  },
  searchrequest: (req, res, next) => {
    const schema = Joi.object({
      
      limit: Joi.number().required(),
      pageNumber: Joi.number().required(),
    });

    validators.validateQueryParam(req, next, schema);
  },
};

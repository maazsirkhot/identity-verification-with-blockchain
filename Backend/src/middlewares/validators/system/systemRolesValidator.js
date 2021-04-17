const Joi = require('joi');
const validators = require('../index');

module.exports = {
  createRole: (req, res, next) => {
    const schema = Joi.object({
      roleName: Joi.string().required(),
      dataFields: Joi.array().required(),
    });

    validators.validateRequestBody(req, next, schema);
  },
  getRole: (req, res, next) => {
    const schema = Joi.object({
      roleName: Joi.string().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  updateRole: (req, res, next) => {
    const schema = Joi.object({
      roleName: Joi.string(),
      permissions: Joi.array().required(),
      isActive: Joi.boolean(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

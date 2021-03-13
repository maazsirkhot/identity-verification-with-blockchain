const Joi = require('joi');
const validators = require('../index');

module.exports = {
  createPermission: (req, res, next) => {
    const schema = Joi.object({
      permissionName: Joi.string().required(),
      dataField: Joi.array().required(),
    });

    validators.validateRequestBody(req, next, schema);
  },
  getPermission: (req, res, next) => {
    const schema = Joi.object({
      permissionName: Joi.string().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  updatePermission: (req, res, next) => {
    const schema = Joi.object({
      permissionName: Joi.string(),
      dataField: Joi.array().required(),
      isActive: Joi.boolean(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

const Joi = require('joi');
const validators = require('../index');

module.exports = {
  getInfoField: (req, res, next) => {
    const schema = Joi.object({
      fieldName: Joi.string().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  createInfoField: (req, res, next) => {
    const schema = Joi.object({
      fieldName: Joi.string().required(),
      fieldAbstraction: Joi.object().default({ parameters: [], method: '' }),
      verificationEntities: Joi.array().default([]),
      verficationMethod: Joi.string(),
      verificationAPI: Joi.object(),
    });

    validators.validateRequestBody(req, next, schema);
  },
  updateInfoField: (req, res, next) => {
    const schema = Joi.object({
      fieldName: Joi.string(),
      fieldAbstraction: Joi.object(),
      verificationEntities: Joi.array(),
      verficationMethod: Joi.string(),
      verificationAPI: Joi.object(),
      isActive: Joi.boolean(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

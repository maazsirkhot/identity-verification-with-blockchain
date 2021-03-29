const Joi = require('joi');
const validators = require('../index');

module.exports = {
  searchUser: (req, res, next) => {
    const schema = Joi.object({
      user: Joi.string().required(),
      limit: Joi.number().required(),
      pageNumber: Joi.number().required(),
    });

    validators.validateQueryParam(req, next, schema);
  },
  fetchPost: (req, res, next) => {
    const schema = Joi.object({
      dataRequestId: Joi.string().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
};

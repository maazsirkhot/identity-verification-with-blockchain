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
};

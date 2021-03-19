const Joi = require('joi');
const validators = require('../index');

module.exports = {
  getRolesForUser: (req, res, next) => {
    const schema = Joi.object({
      option: Joi.string().valid('default', 'all', 'custom').required(),
    });

    validators.validateQueryParam(req, next, schema);
  },
};

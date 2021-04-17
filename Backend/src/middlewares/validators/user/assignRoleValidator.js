const Joi = require('joi');
const validators = require('../index');

module.exports = {
createAssignRoleFields: (req, res, next) => {
    const schema = Joi.object({
      client: Joi.object().required(),
      role: Joi.object().required(),
      requestId: Joi.string().required(),
      action: Joi.string().required()
    });

    validators.validateRequestBody(req, next, schema);
  },
};

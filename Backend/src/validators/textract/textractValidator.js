const Joi = require('joi');
const validators = require('../index');

module.exports = {
  texValid: (req, res, next) => {
    const schema = Joi.object({
      user_id: Joi.string().required(),
    });
    validators.validateRequestBody(req, next, schema);
  },
};

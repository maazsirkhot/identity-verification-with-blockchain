const Joi = require('joi');
const validators = require('../index');

module.exports = {
  userDataFields: (req, res, next) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
    });

    validators.validateRequestParam(req, next, schema);
  },
  getProfile: (req, res, next) => {
    /**
     * CURRENT - Only datafields selected by the user to display are fetched
     * ALL - Fetches all datafields including current ones and from other uploaded documents
     */
    const schema = Joi.object({
      option: Joi.string().valid('CURRENT', 'ALL').required(),
    });
    validators.validateQueryParam(req, next, schema);
  },
  postsForUser: (req, res, next) => {
    const schema = Joi.object({
      option: Joi.string().valid('CURRENT', 'EXPIRED', 'ALL').required(),
    });

    validators.validateQueryParam(req, next, schema);
  },
  setDocumentForUser: (req, res, next) => {
    /**
    dataFieldsWithDoc:
     [
       {
         fieldName: firstname,
         docshortName: DL
       },
       {
         fieldName: lastname,
         docshortName: PASS
       },
     ]
    */
    const schema = Joi.object({
      dataFieldsWithDoc: Joi.array().required(),
    });

    validators.validateRequestBody(req, next, schema);
  },
};

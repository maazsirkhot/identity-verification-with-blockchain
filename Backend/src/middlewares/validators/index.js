module.exports = {
  validateRequestBody: (req, next, schema) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
      next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    } else {
      req.body = value;
      next();
    }
  },

  validateRequestParam: (req, next, schema) => {
    console.log(req.params);
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.params, options);
    if (error) {
      next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    } else {
      req.body = value;
      next();
    }
  },
  validateQueryParam: (req, next, schema) => {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = schema.validate(req.query, options);
    if (error) {
      next(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    } else {
      req.body = value;
      next();
    }
  },
};

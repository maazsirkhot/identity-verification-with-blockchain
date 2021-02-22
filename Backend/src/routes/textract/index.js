const textract = require('./textract');

module.exports = (app) => {
  app.use('/textract', textract);
};

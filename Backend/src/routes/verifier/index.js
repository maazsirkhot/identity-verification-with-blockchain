const verifier = require('./verifier');

module.exports = (app) => {
  app.use('/verifier/fetch', verifier);
};

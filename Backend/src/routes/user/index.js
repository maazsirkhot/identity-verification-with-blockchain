const fetchInfo = require('./fetchInfo');

module.exports = (app) => {
  app.use('/user/fetch', fetchInfo);
};

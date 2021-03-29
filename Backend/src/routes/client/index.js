const fetchClientInfo = require('./fetchClientInfo');
const requests = require('./request');

module.exports = (app) => {
  app.use('/client/fetch', fetchClientInfo);
  app.use('/client/request', requests);
};

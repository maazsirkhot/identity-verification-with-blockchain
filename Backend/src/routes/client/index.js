const fetchClientInfo = require('./fetchClientInfo');
const requests = require('./request');
const customRequest = require('./customRequest');

module.exports = (app) => {
  app.use('/client/fetch', fetchClientInfo);
  app.use('/client/request', requests);
  app.use('/client/customRequest', customRequest);
};

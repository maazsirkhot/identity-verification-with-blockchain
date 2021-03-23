const fetchClientInfo = require('./fetchClientInfo');
const dataRequests = require('./dataRequest');

module.exports = (app) => {
  app.use('/client/fetch', fetchClientInfo);
  app.use('/client/request', dataRequests);
};

const fetchInfo = require('./fetchInfo');
const roleManagement = require('./roleManagement');
const userRequest = require('./userRequest');

module.exports = (app) => {
  app.use('/user/fetch', fetchInfo);
  app.use('/user/role', roleManagement);
  app.use('/user/request', userRequest);
};

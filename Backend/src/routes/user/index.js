const fetchInfo = require('./fetchInfo');
const roleManagement = require('./roleManagement');

module.exports = (app) => {
  app.use('/user/fetch', fetchInfo);
  app.use('/user/role', roleManagement);
};

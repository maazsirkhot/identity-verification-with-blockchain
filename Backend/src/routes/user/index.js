const fetchInfo = require('./fetchInfo');
const roleManagement = require('./roleManagement');
const userRequest = require('./userRequest');
const assignRole = require('./assignRole');

module.exports = (app) => {
  app.use('/user/fetch', fetchInfo);
  app.use('/user/role', roleManagement);
  app.use('/user/request', userRequest);
  app.use('/user/assignRole', assignRole);
};

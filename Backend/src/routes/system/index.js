const systemInfoFields = require('./systemInfoFields');
const systemPermissions = require('./systemPermissions');
// const systemRoles = require('./systemRoles');

module.exports = (app) => {
  app.use('/system/infoFields', systemInfoFields);
  app.use('/system/permissions', systemPermissions);
  // app.use('/system/roles', systemRoles);
};

const _ = require('lodash');
const Permission = require('../../models/mongoDB/permission');
const utilFunctions = require('../../helpers/utilFunctions');

module.exports = {
  getPermissions: async (options) => {
    try {
      return Permission.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  createPermission: async (permission) => {
    try {
      if (
        !_.isPlainObject(permission)
        || utilFunctions.validateAttributesInObject(
          permission,
          ['permissionName', 'dataField', 'isActive']
            || utilFunctions.validateAttributesInObject(permission.dataField, [
              'id',
              'fieldName',
            ]),
        )
      ) {
        throw new Error('Parameters format is invalid.');
      }
      return new Permission(permission).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  updatePermission: async (options, updatedFields) => {
    try {
      if (!_.isPlainObject(updatedFields) || !_.isPlainObject(options)) {
        throw new Error('Parameters format is invalid.');
      }
      return Permission.findOneAndUpdate(options, updatedFields, { new: true });
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};

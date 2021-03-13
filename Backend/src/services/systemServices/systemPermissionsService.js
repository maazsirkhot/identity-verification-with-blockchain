const constants = require('../../../utils/constants');
const permissionDao = require('../../daos/permission/permission');

module.exports = {
  createPermissionService: async (permission) => {
    try {
      permission.isActive = true;
      const data = await permissionDao.createPermission(permission);

      if (!data) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.PERMISSION_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  getPermissionsService: async (options) => {
    try {
      const data = await permissionDao.getPermissions(options);

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.PERMISSION_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  updatePermissionService: async (permissionName, updatedFields) => {
    try {
      const data = await permissionDao.updatePermission(permissionName, updatedFields);

      if (!data) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.PERMISSION_UPDATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

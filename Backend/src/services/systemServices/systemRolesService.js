const constants = require('../../../utils/constants');
const roleDao = require('../../daos/role/role');

module.exports = {
  createRoleService: async (role) => {
    try {
      role.isActive = true;
      const data = await roleDao.createRole(role);
      if (!data) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.ROLE_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  getRolesService: async (options) => {
    try {
      const data = await roleDao.getRole(options);

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.ROLE_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  updateRoleService: async (roleName, updatedFields) => {
    try {
      const data = await roleDao.updateRole({ roleName }, updatedFields);

      if (!data) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.ROLE_UPDATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

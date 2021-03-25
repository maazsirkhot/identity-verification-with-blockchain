const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const roleDao = require('../../daos/role/role');

module.exports = {
  getRolesForUserService: async (createdBy, option) => {
    try {
      if (!utilFunctions.validateAttributesInObject(createdBy, ['type', 'id'])) {
        return false;
      }
      let data = [];
      if (option === 'custom') {
        data = await roleDao.getRole({ createdBy, isActive: true });
      }

      if (option === 'default') {
        data = await roleDao.getRole({ isDefault: true, isActive: true });
      }

      if (option === 'all') {
        data = await roleDao.getRole({ $or: [{ createdBy }, { isDefault: true }], isActive: true });
      }

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
};

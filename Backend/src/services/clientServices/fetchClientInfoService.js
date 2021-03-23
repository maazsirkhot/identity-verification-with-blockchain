const _ = require('lodash');
const constants = require('../../../utils/constants');
const userDao = require('../../daos/user/user');
const utilFunctions = require('../../helpers/utilFunctions');

module.exports = {
  searchUserService: async (user, type, options) => {
    try {
      if (!user || !utilFunctions.validateAttributesInObject(options, ['pageNumber', 'limit'])) {
        return false;
      }

      options.offset = options.limit * (options.pageNumber - 1);
      _.omit(options, ['pageNumber']);

      const data = await userDao.searchUser(user, type, options);

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.USER_DETAILS_GET,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

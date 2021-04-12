const constants = require('../../../utils/constants');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');

module.exports = {
  getUserRequestService: async (userEmail) => {
    try {
      if (!userEmail) {
        return false;
      }

      const result = await dataRequestDao.getRequest({ 'user.email': userEmail });
      if (result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      return {
        dataAvailable: true,
        data: result,
        message: constants.MESSAGES.DATA_REQUESTS_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  requestActionService: async (requestId, action) => {
    try {
      if (!requestId || !action) {
        return false;
      }
      return true;
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

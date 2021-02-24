const userDetailsDao = require('../../daos/textract/userDetailsDao');
const constants = require('../../../utils/constants');

module.exports = {
  userDataFieldsService: async (userEmail) => {
    try {
      if (!userEmail) {
        return false;
      }

      const result = await userDetailsDao.findUserDetailsByEmail(userEmail);
      if (result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      console.log(result);
      return {
        dataAvailable: true,
        data: result,
        message: constants.MESSAGES.USER_DETAILS,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

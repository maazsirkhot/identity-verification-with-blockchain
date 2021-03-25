const _ = require('lodash');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');

module.exports = {
  newUserService: async (user, creator, fieldsRequested) => {
    try {
      if (
        !utilFunctions.validateAttributesInObject(user, [
          'userId',
          'username',
          'email',
        ])
        || !utilFunctions.validateAttributesInObject(creator, [
          'userId',
          'username',
          'email',
        ])
        || !_.isArray(fieldsRequested)
      ) {
        return false;
      }

      const data = await dataRequestDao.createDataRequest({ user, creator, fieldsRequested });

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.DATA_REQUEST_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

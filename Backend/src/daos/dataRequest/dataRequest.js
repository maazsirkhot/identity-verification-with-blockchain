const utilFunctions = require('../../helpers/utilFunctions');
const DataRequest = require('../../models/mongoDB/dataRequest');

module.exports = {
  createDataRequest: async (dataRequest) => {
    try {
      if (!utilFunctions.validateAttributesInObject(dataRequest, ['creator', 'user', 'fieldsRequested'])) {
        throw new Error('Parameters format is invalid.');
      }
      return new DataRequest(dataRequest).save();
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
  getRequest: async (options) => {
    try {
      return DataRequest.find(options);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers: ${error}`);
    }
  },
};

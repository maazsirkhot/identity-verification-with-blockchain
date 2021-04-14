const _ = require('lodash');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const customRequestDao = require('../../daos/customRequest/customRequest');

module.exports = {
  newUserService: async (client, name, fieldsAdded) => {
    try {
      if (
        !utilFunctions.validateAttributesInObject(client, [
          'userId',
          'username',
          'email',
        ])
        || !utilFunctions.validateArrayOfObjects(fieldsAdded, [
          'fieldId',
          'fieldName',
          'isAbstracted',
        ])
      ) {
        return false;
      }

      const dataExists = await customRequestDao.getCustomRequestByName({ "name": name, "client.userId" : client.userId });
      if(dataExists !== null){
        return {
          dataAvailable: false,
          data: [],
          message: constants.MESSAGES.CUSTOM_REQUEST_SAME_NAME,
        };
      }
      const data = await customRequestDao.createCustomRequest({
        client,
        name,
        fieldsAdded,
      });

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.CUSTOM_REQUEST_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  fetchCustomRequestsService: async (clientId) => {
    try {
      if (!clientId) {
        return false;
      }

      const data = await customRequestDao.getCustomRequest({ "client.userId" : clientId });

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.CUSTOM_REQUEST_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  fetchCustomRequestsByNameService: async (name, clientId) => {
    try {
      if (!clientId) {
        return false;
      }

      const data = await customRequestDao.getCustomRequestByName({ "name": name, "client.userId" : clientId });

      if(!data){
        return {
          dataAvailable: false,
          data: [],
        };
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
        message: constants.MESSAGES.CUSTOM_REQUEST_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  updateCustomRequestService: async (clientUserId, customRequestObjectId, customReqDetails) => {
    try{
      if (!clientUserId) {
        return false;
      }

      const data = await customRequestDao.updateCustomRequest({ "_id": customRequestObjectId, "client.userId" : clientUserId }, customReqDetails);
      if(!data){
        return {
          dataAvailable: false,
          data: [],
        };
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
        message: constants.MESSAGES.CUSTOM_REQUEST_UPDATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  }
};

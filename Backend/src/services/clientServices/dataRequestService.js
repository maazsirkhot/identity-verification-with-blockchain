const _ = require('lodash');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');
const roleDao = require('../../daos/role/role');
const permissionDao = require('../../daos/permission/permission');

module.exports = {
  newUserService: async (client, user, fieldsRequested, comment) => {
    try {
      if (
        !utilFunctions.validateAttributesInObject(user, [
          'userId',
          'username',
          'email',
        ])
        || !utilFunctions.validateAttributesInObject(client, [
          'userId',
          'username',
          'email',
        ])
        || !utilFunctions.validateArrayOfObjects(fieldsRequested, [
          'fieldId',
          'fieldName',
          'isAbstracted',
        ])
      ) {
        return false;
      }

      const data = await dataRequestDao.createDataRequest({
        user,
        client,
        fieldsRequested,
        comment,
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
        message: constants.MESSAGES.DATA_REQUEST_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  fetchRequestsService: async (clientId) => {
    try {
      if (!clientId) {
        return false;
      }

      const data = await dataRequestDao.getRequest({ 'client.userId': clientId });

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data,
        message: constants.MESSAGES.DATA_REQUESTS_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  requestRoleService: async (user, client, roleRequested) => {
    try {
      if (
        !utilFunctions.validateAttributesInObject(user, [
          'userId',
          'username',
          'email',
        ])
        || !utilFunctions.validateAttributesInObject(client, [
          'userId',
          'username',
          'email',
        ])
        || !roleRequested
      ) {
        return false;
      }

      const role = await roleDao.getRole({ _id: roleRequested });

      if (!role) return false;

      const fieldsRequested = await _.map(role.permissions, async (permission) => {
        const permissionFromDB = await permissionDao.getPermissions({ _id: permission.id });

        return permissionFromDB.dataField;
      });

      const data = await dataRequestDao.createDataRequest({
        user,
        client,
        fieldsRequested,
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
        message: constants.MESSAGES.DATA_REQUEST_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  searchRequestService: async (user, options, clientId) => {
    try {
      if (!utilFunctions.validateAttributesInObject(options, ['pageNumber', 'limit'])) {
        return false;
      }

      options.offset = options.limit * (options.pageNumber);
      _.omit(options, ['pageNumber']);

      const data = await dataRequestDao.searchRequest(user, options, clientId);

      if (data.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }
      if (data.result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data: data.result,
        total: data.count,
        numberOfPages: data.numberOfPages,
        message: constants.MESSAGES.DATA_REQUESTS_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

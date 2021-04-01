const _ = require('lodash');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');
const roleDao = require('../../daos/role/role');
const permissionDao = require('../../daos/permission/permission');

module.exports = {
  newUserService: async (creator, user, fieldsRequested) => {
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
        creator,
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
  fetchRequestsService: async (clientId) => {
    try {
      if (!clientId) {
        return false;
      }

      const data = await dataRequestDao.getRequest({ "creator.userId" : clientId });

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
  requestRoleService: async (user, creator, roleRequested) => {
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
        creator,
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
};

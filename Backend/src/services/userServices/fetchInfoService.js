/* eslint-disable max-len */
const _ = require('lodash');
const userDetailsDao = require('../../daos/textract/userDetailsDao');
const postDao = require('../../daos/post/post');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');

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
      result[0].dataField = _.filter(result[0].dataField, (field) => field.isVerified === true);
      console.log(result);
      return {
        dataAvailable: true,
        data: result[0],
        message: constants.MESSAGES.USER_DETAILS,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  postsForUserService: async (userEmail, option) => {
    try {
      if (!userEmail || !option) {
        return false;
      }
      let options = {};
      if (option === 'CURRENT') {
        options = {
          user: { email: userEmail },
          expiry: { isExpired: false },
        };
      }

      if (option === 'EXPIRED') {
        options = {
          user: { email: userEmail },
          expiry: { isExpired: true },
        };
      }

      if (option === 'ALL') {
        options = {
          user: { email: userEmail },
        };
      }

      const result = await postDao.getPost(options);

      if (result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      return {
        dataAvailable: true,
        data: result,
        message: constants.MESSAGES.POST_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  profileForUserService: async (userEmail, option) => {
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
      if (option === 'CURRENT') {
        result[0].dataField = _.filter(result[0].dataField, (field) => field.isCurrent === true && field.isVerified === true);
      } else {
        result[0].dataField = _.filter(result.dataField, (field) => field.isVerified === true);
      }

      return {
        dataAvailable: true,
        data: result[0],
        message: constants.MESSAGES.USER_DETAILS,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  setDocumentForUserService: async (user, dataFieldsWithDoc) => {
    try {
      if (!utilFunctions.validateArrayOfObjects(dataFieldsWithDoc, ['fieldName', 'docshortName']));

      const userFields = await userDetailsDao.findUserDetailsByEmail(user.email);

      const userDataFields = userFields[0].dataField;

      const updatedUserDataFields = _.map(userDataFields, (datafield) => {
        const dataFieldWithDoc = _.find(dataFieldsWithDoc, (entry) => entry.fieldName === datafield.field_name);

        if (typeof (dataFieldWithDoc) === 'undefined') {
          return datafield;
        }

        if (datafield.verifierDoc.docshortName === dataFieldWithDoc.docshortName) {
          datafield.isCurrent = true;
        } else {
          datafield.isCurrent = false;
        }
        return datafield;
      });

      const result = await userDetailsDao.updateUserFields({ userEmail: user.email }, { dataField: updatedUserDataFields });

      if (result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

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

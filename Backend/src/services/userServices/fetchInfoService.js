const _ = require('lodash');
const userDetailsDao = require('../../daos/textract/userDetailsDao');
const postDao = require('../../daos/post/post');
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
  profileForUserService: async (userEmail) => {
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

      result.dataField = _.filter(result.dataField, (field) => field.isCurrent === true);
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

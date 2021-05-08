const _ = require('lodash');
const constants = require('../../../utils/constants');
const userDao = require('../../daos/user/user');
const postDao = require('../../daos/post/post');
const utilFunctions = require('../../helpers/utilFunctions');
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const https = require('https');
const axios = require('axios');

module.exports = {
  searchUserService: async (user, type, options) => {
    try {
      if (!utilFunctions.validateAttributesInObject(options, ['pageNumber', 'limit'])) {
        return false;
      }

      options.offset = options.limit * (options.pageNumber - 1);
      _.omit(options, ['pageNumber']);

      const data = await userDao.searchUser(user, type, options);

      if (data.result && data.result.length === 0) {
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
        message: constants.MESSAGES.USER_DETAILS_GET,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  fetchPostService: async (dataRequestId) => {
    try {
      if (!dataRequestId) {
        return false;
      }

      let postData = await postDao.getPost({ dataRequest: mongoose.Types.ObjectId(dataRequestId) });

      if (postData.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      postData = postData[0].toObject({ getters: true });
      let userDataFields = postData.userDataFields;

      const agent = new https.Agent({  
        rejectUnauthorized: false
       });

       const walletId = userDataFields[0].dataReference;

       blockchainResponseJson = await axios.get(constants.ENV_VARIABLES.BLOCKCHAIN_HOST + '/resources/'+walletId, { httpsAgent: agent });
        if (blockchainResponseJson.data.isValid !== undefined) {
          const isValid = blockchainResponseJson.data.isValid;
          for(i in userDataFields) {
            userDataFields[i].isValid = isValid;
          }
        }
      // let keyValuePair = {};
      // for(i in userDataFields) {
      //   walletId = userDataFields[i].dataReference;
      //   if(walletId in keyValuePair) {
      //     userDataFields[i].isValid = keyValuePair[walletId];
      //   } else {
      //     const blockchainResponseData = await fetch(constants.ENV_VARIABLES.BLOCKCHAIN_HOST + '/resources/'+walletId, {method: 'GET'});
      //     const blockchainResponseJson = await blockchainResponseData.json();
      //     if (blockchainResponseJson.isValid !== undefined)
      //       userDataFields[i].isValid = blockchainResponseJson.isValid;
      //     else
      //       userDataFields[i].isValid = false;
      //     keyValuePair[walletId] = userDataFields[i].isValid;
      //   }
      // }
      

      return {
        dataAvailable: true,
        postData,
        message: constants.MESSAGES.POST_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

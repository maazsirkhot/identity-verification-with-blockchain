/* eslint-disable max-len */
const _ = require('lodash');
const mongoose = require('mongoose');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');
const userFieldsDao = require('../../daos/userFields/userFields');
const postDao = require('../../daos/post/post');
const fieldAbstractionMethods = require('../../helpers/fieldAbstractionMethods');

module.exports = {
  getUserRequestService: async (userEmail) => {
    try {
      if (!userEmail) {
        return false;
      }

      const result = await dataRequestDao.getRequest({
        'user.email': userEmail,
      });

      const userFields = await userFieldsDao.getUserFields({ userEmail });

      userFields.dataField = _.filter(userFields.dataField, (field) => field.isVerified === true && field.isCurrent === true);

      if (result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      result.fieldsRequested = _.map(result.fieldsRequested, (field) => {
        const userField = _.find(userFields.dataField, (entry) => entry.field_name === field.fieldName);

        if (typeof userField === 'undefined') {
          field.userField = false;
        } else {
          field.userField = userField;
        }

        return field;
      });

      return {
        dataAvailable: true,
        data: result,
        message: constants.MESSAGES.DATA_REQUESTS_FETCHED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
  requestActionService: async (requestId, action, expiryDurationObj) => {
    try {
      if (!requestId || !action) {
        return false;
      }

      if (action === 'REJECTED') {
        const result = await dataRequestDao.updateDataRequest(
          { id: requestId },
          { status: action },
        );
        return {
          dataAvailable: true,
          data: result,
          message: constants.MESSAGES.DATA_REQUESTS_UPDATED,
        };
      }
      const allResults = await dataRequestDao.getRequest({ _id: mongoose.Types.ObjectId(requestId) });
      const dataRequest = allResults[0];
      console.log(dataRequest);
      const user = await userFieldsDao.getOneUserField({
        userEmail: dataRequest.user.email,
      });

      const allFieldNames = _.map(
        dataRequest.fieldsRequested,
        (field) => field.fieldName,
      );

      const userFields = user.dataField;
      const expiry = {
        expireTime: utilFunctions.timestampAdderToCurrentTime(
          expiryDurationObj,
        ),
        isExpired: false,
      };

      // Build the userDataFields Object --> Possible future scope to refactor and split this activity
      const userDataFields = [];
      _.forEach(userFields, async (userField) => {
        if (_.includes(allFieldNames, userField.field_name) && userField.isVerified && userField.isCurrent) {
          const requestField = _.remove(
            dataRequest.fieldsRequested,
            (field) => field.fieldName === userField.field_name,
          );

          let fieldValue;
          console.log(requestField[0].isAbstracted);
          if (requestField[0].isAbstracted === true) {
            fieldValue = fieldAbstractionMethods[userField.field_name](requestField.abstractionParam, userField.field_value);
          } else {
            fieldValue = userField.field_value;
          }

          userDataFields.push({
            field_id: userField.field_id,
            field_name: userField.field_name,
            field_value: fieldValue,
            dataReference: userField.dataReference,
          });
        }
      });

      const createPost = await postDao.createPost({
        client: dataRequest.client,
        user: dataRequest.user,
        expiry,
        userDataFields,
        dataRequest: dataRequest.id.toString(),
      });

      await dataRequestDao.updateDataRequest(
        { _id: requestId },
        { status: action },
      );

      return {
        dataAvailable: true,
        data: createPost,
        message: constants.MESSAGES.POST_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

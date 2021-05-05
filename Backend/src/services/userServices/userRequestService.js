/* eslint-disable max-len */
const _ = require('lodash');
const mongoose = require('mongoose');
const constants = require('../../../utils/constants');
const utilFunctions = require('../../helpers/utilFunctions');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');
const userFieldsDao = require('../../daos/userFields/userFields');
const postDao = require('../../daos/post/post');
const fieldAbstractionMethods = require('../../helpers/fieldAbstractionMethods');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
  getUserRequestService: async (userEmail) => {
    try {
      if (!userEmail) {
        return false;
      }

      let result = await dataRequestDao.getRequest({
        'user.email': userEmail,
      });

      const userFields = await userFieldsDao.getUserFields({ userEmail });

      userFields[0].dataField = _.filter(userFields[0].dataField, (field) => field.isVerified === true && field.isCurrent === true);

      //userFields[0].dataField = utilFunctions.addAgeFieldToUserFields(userFields[0].dataField);
      if (result.length === 0) {
        return {
          dataAvailable: false,
          data: [],
        };
      }

      allRequests = [];
      _.forEach(result, (request) => {
        updatedData = _.map(request.fieldsRequested, (field) => {
          if (field.fieldName == 'Age')
            fieldName = 'Date of Birth';
          else
            fieldName = field.fieldName;
          const userField = _.find(userFields[0].dataField, (entry) => entry.field_name === fieldName);

          // const new_field = field.toObject({ getters: true });
          // if (field.fieldName == 'Age') {
          //   new_field.fieldName = 'Age'
          // }
            
          if (typeof userField === 'undefined') {
            field.isAvailable = false;
          } else {
            field.isAvailable = true;
          }
          return field;
        });
        // const res = request.toObject({ getters: true });
        request.fieldsRequested = updatedData;
        allRequests.push(request);
      });

      return {
        dataAvailable: true,
        data: allRequests,
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
          { _id: requestId },
          { status: action },
        );
        return {
          dataAvailable: true,
          data: result,
          message: constants.MESSAGES.DATA_REQUESTS_UPDATED,
        };
      }

      const dataRequest = await dataRequestDao.getRequest({_id: new ObjectId(requestId)});
      const user = await userFieldsDao.getUserFields({
        userEmail: dataRequest[0].user.email,
      });

      //user.dataField = utilFunctions.addAgeFieldToUserFields(user.dataField);

      const allFieldNames = _.map(
        dataRequest[0].fieldsRequested,
        (field) => {
          if (field.fieldName == 'Age') {
            return {
              req: field.fieldName,
              need : 'Date of Birth',
              abstractionParam: field.abstractionParam,
              userDisplay: field.userDisplay,
            }
          } else {
            return {
              req: field.fieldName,
              need : field.fieldName,
              abstractionParam: field.abstractionParam,
              userDisplay: field.userDisplay,
            }
          }
        }
      );

      const userFields = user[0].dataField;
      const expiry = {
        expireTime: utilFunctions.timestampAdderToCurrentTime(
          expiryDurationObj,
        ),
        isExpired: false,
      };

      // Build the userDataFields Object --> Possible future scope to refactor and split this activity
      const userDataFields = [];
      _.forEach(userFields, async (userField) => {
        _.forEach(allFieldNames, (field) => {
          if (field.need === userField.field_name &&
            userField.isCurrent && userField.isVerified) {
          
            let requestField = {} 
            for (request in dataRequest[0].fieldsRequested) {
                if(field.req === dataRequest[0].fieldsRequested[request].fieldName) {
                  requestField = dataRequest[0].fieldsRequested[request]; 
                  break;
                }
            };

            let fieldValue;
            if (requestField.isAbstracted == true) {
              fieldValue = fieldAbstractionMethods[field.req](requestField.abstractionParam, userField.field_value);
            } else {
              fieldValue = userField.field_value;
            }

            userDataFields.push({
              field_id: userField.field_id,
              field_name: requestField.fieldName,
              field_value: fieldValue,
              dataReference: userField.dataReference,
              abstractionParam: requestField.abstractionParam,
              userDisplay: requestField.userDisplay,
            });
          }
        });
      });

      const createPost = await postDao.createPost({
        client: dataRequest[0].client,
        user: dataRequest[0].user,
        expiry,
        userDataFields,
        dataRequest: dataRequest[0]._id.toString(),
      });

      updatePost = await dataRequestDao.updateDataRequest(
        { _id: mongoose.Types.ObjectId(requestId) },
        { status: action }
      );

      if (!updatePost) {
        return {
          dataAvailable: false,
          message: constants.MESSAGES.FAILED_ROLE_ASSIGN,
        };
      }

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

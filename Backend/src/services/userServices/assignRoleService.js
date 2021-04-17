const roleAssignDao = require('../../daos/roleAssign/roleAssign');
const roleDao = require('../../daos/role/role');
const utilFunctions = require('../../helpers/utilFunctions');
const constants = require('../../../utils/constants');
const userFieldsDao = require('../../daos/userFields/userFields');
const _ = require('lodash');
const dataRequestDao = require('../../daos/dataRequest/dataRequest');
var ObjectId = require('mongodb').ObjectId; 
const fieldAbstractionMethods = require('../../helpers/fieldAbstractionMethods');

module.exports = {
  createassignRole: async (user, client, role, requestId, action) => {
    try {
      if (!utilFunctions.validateAttributesInObject(user, ['userId', 'username','email'])) {
        return false;
      }
      if (!utilFunctions.validateAttributesInObject(client, ['userId', 'username','email'])) {
        return false;
      }
      if (!utilFunctions.validateAttributesInObject(role, ['roleId', 'roleName'])) {
        return false;
      }
      const userFields = await userFieldsDao.getUserFields({userId: user.userId});
      if(!userFields) {
        return {
          dataAvailable: false,
          message: constants.MESSAGES.USER_NOT_EXIST,
        };
      }
      if(userFields.length === 0) {
        return {
          dataAvailable: false,
          message: constants.MESSAGES.USER_NOT_EXIST,
        };
      }
      const userDataFieldsFromDB = userFields[0].dataField;

      //get fieldname->idtype from profile
      //to be removed
      idType = 'CADL';
      const roleDataFields = await roleDao.getRole({_id: role.roleId});
      const userDataFields = [];
      let fieldName = "";
      _.forEach(roleDataFields[0].dataFields, async (roleField) => {
        let fieldValue = "";
        found = false;
        userData = "";
        fieldName = roleField.fieldName;
        _.forEach(userDataFieldsFromDB, async (userField) => {
          if (roleField.fieldName === 'Age') {
            checkFieldName = 'Date of Birth';
          } else {
            checkFieldName = roleField.fieldName
          }
          if(userField.field_name === checkFieldName && 
            userField.verifierDoc.docshortName == idType) {
            found = true;
            userData = userField;
            if(roleField.abstractionParam === "complete information"){
              fieldValue = userField.field_value;
            } else {
              fieldValue = fieldAbstractionMethods[roleField.fieldName](roleField.abstractionParam, userField.field_value);
            }
          }
        });
        if (found == false) {
          userDataFields.push({
            field_name: fieldName,
            field_value: 'Information not found',
            dataReference: '',
          });
        } else {
          userDataFields.push({
            field_name: fieldName,
            field_value: fieldValue,
            dataReference: userData.dataReference,
          });
        }
      });
      
      const roleAssignData = await roleAssignDao.createRoleAssign(user, client, role, userDataFields);

      if(!roleAssignData) {
        return {
          dataAvailable: false,
          message: constants.MESSAGES.FAILED_ROLE_ASSIGN,
        };
      }

      updateRoleAssign = await dataRequestDao.updateDataRequest(
        { _id: new ObjectId(requestId) },
        { status: action },
      );

      if (!updateRoleAssign) {
        return {
          dataAvailable: false,
          message: constants.MESSAGES.FAILED_ROLE_ASSIGN,
        };
      }

      return {
        dataAvailable: true,
        data: roleAssignData,
        message: constants.MESSAGES.ROLE_ASSIGN_CREATED,
      };
    } catch (error) {
      throw new Error(`Error Occurred in Service Layers: ${error}`);
    }
  },
};

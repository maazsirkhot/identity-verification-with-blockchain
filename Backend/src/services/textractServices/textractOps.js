/* eslint-disable no-underscore-dangle */
const AWS = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');
const UserField = require('../../models/mongoDB/userFields');
const userDetailsDao = require('../../daos/textract/userDetailsDao');
const constants = require('../../../utils/constants');

module.exports = {
  getRelevantTextService: (data, keyValuePair) => {
    try {
      const blocks = data.Blocks;
      const output = [];

      _.each(blocks, (innerdata) => {
        if (innerdata.BlockType === 'LINE') {
          if (innerdata.Text
              && innerdata.Text.substring(0, 2) === 'FN'
              && keyValuePair['First Name']) {
            const d = {};
            d.field_id = keyValuePair['First Name'];
            d.field_name = 'First Name';
            d.field_value = innerdata.Text.substring(2);
            d.verifierDoc = keyValuePair.idType;
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 2) === 'LN'
              && keyValuePair['Last Name']) {
            const d = {};
            d.field_id = keyValuePair['Last Name'];
            d.field_name = 'Last Name';
            d.field_value = innerdata.Text.substring(2);
            d.verifierDoc = keyValuePair.idType;
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'DOB'
              && keyValuePair['Date of Birth']) {
            const d = {};
            d.field_id = keyValuePair['Date of Birth'];
            d.field_name = 'Date of Birth';
            d.field_value = innerdata.Text.substring(4);
            d.verifierDoc = keyValuePair.idType;
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'EXP'
              && keyValuePair['Expiry Date']) {
            const d = {};
            d.field_id = keyValuePair['Expiry Date'];
            d.field_name = 'Expiry Date';
            d.field_value = innerdata.Text.substring(4);
            d.verifierDoc = keyValuePair.idType;
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'SEX'
              && keyValuePair.Sex) {
            const d = {};
            d.field_id = keyValuePair.Sex;
            d.field_name = 'Sex';
            d.field_value = innerdata.Text.substring(4);
            d.verifierDoc = keyValuePair.idType;
            output.push(d);
          }
        }
      });
      return output;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  getAllDataFields: async (idType) => {
    try {
      const dataFieldData = await userDetailsDao.findAllDataFields();
      const idTypeData = await userDetailsDao.findIdTypeByShortName(idType);
      const idTypeObj = {
        docId: idTypeData._id,
        docName: idTypeData.name,
        docshortName: idType,
      };
      const keyValuePair = {};
      for (let i = 0; i < dataFieldData.length; i += 1) {
        keyValuePair[dataFieldData[i].fieldName] = dataFieldData[i]._id;
      }
      keyValuePair.idType = idTypeObj;
      return keyValuePair;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  createUserDetails: async (data, userId, frontLink, backLink, keyValuePair) => {
    try {
      data.push({
        field_id: keyValuePair['Front Page'],
        field_name: 'Front Page',
        field_value: frontLink,
        verifierDoc: keyValuePair.idType,
      });
      if (backLink != null) {
        data.push({
          field_id: keyValuePair['Back Page'],
          field_name: 'Back Page',
          field_value: backLink,
          verifierDoc: keyValuePair.idType,
        });
      }
      console.log(data);
      const userData = new UserField({
        userId,
        userEmail: 'sample@gmail.com',
        dataField: data,
      });
      return await userDetailsDao.createUserDetails(userData);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  createDataFields: async (data) => {
    try {
      return await userDetailsDao.createDataFields(data);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  findUserDetails: async (userId) => {
    try {
      return await userDetailsDao.findUserDetails(userId);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  storeFileInS3: async (file) => {
    try {
      const s3bucket = new AWS.S3({
        accessKeyId: constants.ENV_VARIABLES.AWS_S3_ACCESS_KEY,
        secretAccessKey: constants.ENV_VARIABLES.AWS_S3_SECRET_ACCESS_KEY,
        region: constants.ENV_VARIABLES.AWS_REGION,
      });
      const params = {
        Bucket: constants.ENV_VARIABLES.AWS_S3_BUCKET_NAME,
        Key: uuid.v4() + Date.toString() + file.originalname,
        Body: fs.createReadStream(file.path),
        ContentType: file.mimetype,
        ACL: 'public-read',
      };
      const data = await s3bucket.upload(params).promise();
      // console.log(data);
      if (data) {
        return data.Location;
      }
      return false;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  createIdType: async (data) => {
    try {
      return await userDetailsDao.createIdType(data);
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  getObjectIdFromIdType: async (data) => {
    try {
      const idTypeIds = await userDetailsDao.getIdTypeObjectIds(data);
      const arrOfIdTypeObjectIds = [];
      // eslint-disable-next-line no-unused-vars
      _.forEach(idTypeIds, (val, i) => {
        arrOfIdTypeObjectIds.push(val._id);
      });
      console.log(arrOfIdTypeObjectIds);
      return arrOfIdTypeObjectIds;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  ${error}`);
    }
  },
  ifValidJSON: (data) => {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  },
};

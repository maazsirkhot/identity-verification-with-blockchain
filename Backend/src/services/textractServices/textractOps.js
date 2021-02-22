/* eslint-disable no-underscore-dangle */
const AWS = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');
const UserField = require('../../models/mongoDB/userFields');
const userDetailsDao = require('../../daos/textract/userDetailsDao');

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
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 2) === 'LN'
              && keyValuePair['Last Name']) {
            const d = {};
            d.field_id = keyValuePair['Last Name'];
            d.field_name = 'Last Name';
            d.field_value = innerdata.Text.substring(2);
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'DOB'
              && keyValuePair['Date of Birth']) {
            const d = {};
            d.field_id = keyValuePair['Date of Birth'];
            d.field_name = 'Date of Birth';
            d.field_value = innerdata.Text.substring(4);
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'EXP'
              && keyValuePair['Expiry Date']) {
            const d = {};
            d.field_id = keyValuePair['Expiry Date'];
            d.field_name = 'Expiry Date';
            d.field_value = innerdata.Text.substring(4);
            output.push(d);
          } else if (innerdata.Text
              && innerdata.Text.substring(0, 3) === 'SEX'
              && keyValuePair.Sex) {
            const d = {};
            d.field_id = keyValuePair.Sex;
            d.field_name = 'Sex';
            d.field_value = innerdata.Text.substring(4);
            output.push(d);
          }
        }
      });
      return output;
    } catch (error) {
      throw new Error(`Error Occurred in DAO Layers:  + ${error}`);
    }
  },
  getAllDataFields: async () => {
    try {
      const dataFieldData = await userDetailsDao.findAllDataFields();
      const keyValuePair = {};
      for (let i = 0; i < dataFieldData.length; i += 1) {
        keyValuePair[dataFieldData[i].fieldName] = dataFieldData[i]._id;
      }
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
      });
      if (backLink != null) {
        data.push({
          field_id: keyValuePair['Back Page'],
          field_name: 'Back Page',
          field_value: backLink,
        });
      }
      console.log(data);
      const userData = new UserField({
        userId,
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
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
      const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: file.originalname,
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
};

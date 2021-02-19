/* eslint-disable no-await-in-loop */
const AWS = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');
const DataField = require('../../models/mongoDB/dataField');
const constants = require('../../../utils/constants');
const textractService = require('../../services/textractServices/textractOps');

module.exports = {
  /* extract user details from ID Card */
  // eslint-disable-next-line consistent-return
  fetchUserDetailsFromId: async (req, res) => {
    try {
      const bitmap = fs.readFileSync(req.file.path);
      // eslint-disable-next-line new-cap
      const img = new Buffer.from(bitmap).toString('base64');
      const params = {
        Document: {
          Bytes: Buffer.from(img, 'base64') || img, /* Strings will be Base-64 encoded on your behalf */
        },
        FeatureTypes: [
          'TABLES', 'FORMS',
        ],
      };

      const keyValuePair = await textractService.getAllDataFields();
      /* uncomment this when not using textraxt APIs */
      /* fs.readFile('example.json', async (err, data) => { */
      const textract = new AWS.Textract();
      textract.analyzeDocument(params, async (err, data) => {
        if (err) throw err;
        const relevantText = textractService.getRelevantTextService(data, keyValuePair);
        /* console.log(relevantText); */
        const userDetails = await textractService.createUserDetails(relevantText, req.body.user_id);
        if (!userDetails) {
          return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
            message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
            userDetails,
            dataAvailable: false,
          });
        }
        return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
          message: constants.MESSAGES.USER_DETAILS,
          userDetails,
          dataAvailable: !!_.isPlainObject(userDetails),
        });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  /* - this API is used for creating new fields in Data Fields
    - not to be integrated with Frontend */
  createEntryInDataFields: async (req, res) => {
    try {
      const inputData = req.body.data;
      for (let i = 0; i < inputData.length; i += 1) {
        const data = new DataField({
          fieldName: inputData[i].fieldName,
          fieldAbstraction: inputData[i].fieldAbstraction,
          verificationEntities: inputData[i].verificationEntities,
          verificationMethod: inputData[i].verificationMethod,
          verificationAPI: inputData[i].verificationAPI,
          isActive: true,
        });
        const dataFieldData = await textractService.createDataFields(data);
        if (!dataFieldData) {
          return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
            message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
            dataAvailable: false,
          });
        }
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.DATAFIELDS_CREATED,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  getUserDetails: async (req, res) => {
    try {
      const userDetails = await textractService.findUserDetails(req.query.userId);
      if (userDetails.length === 0) {
        return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_EXIST,
          userDetails,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.USER_DETAILS,
        userDetails,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
};

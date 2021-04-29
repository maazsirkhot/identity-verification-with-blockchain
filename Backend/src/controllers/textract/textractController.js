/* eslint-disable no-await-in-loop */
const AWS = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');
const uuid = require('uuid');
const DataField = require('../../models/mongoDB/dataField');
const constants = require('../../../utils/constants');
const textractService = require('../../services/textractServices/textractOps');
const IdType = require('../../models/mongoDB/idType');

module.exports = {
  /* extract user details from ID Card */
  // eslint-disable-next-line consistent-return
  fetchUserDetailsFromId: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_LOGGED_IN,
          dataAvailable: false,
        });
      }
      // eslint-disable-next-line no-unused-vars
      const [front, back] = req.files;
      const bitmap = fs.readFileSync(front.path);
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

      const keyValuePair = await textractService.getAllDataFields(req.body.idType);
      /* uncomment this when not using textraxt APIs */
      /* fs.readFile('example.json', async (err, data) => { */
      const textract = new AWS.Textract();
      textract.analyzeDocument(params, async (err, data) => {
        if (err) throw err;
        const relevantText = textractService.getRelevantTextService(data, keyValuePair);
        fs.unlinkSync(front.path);
        fs.unlinkSync(back.path);
        return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
          message: constants.MESSAGES.TEXTRACT_RETREIVE_SUCCESS,
          relevantText,
          dataAvailable: !!_.isPlainObject(relevantText),
        });
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.TEXTRACT_RETREIVE_FAILED,
          error,
        });
    }
  },
  storeUserDatainDatabase: async (req, res) => {
    try {
     
      if (!req.user) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_LOGGED_IN,
          dataAvailable: false,
        });
      }
      const [front, back] = req.files;
      const frontImageLink = await textractService.storeFileInS3(front);
      if (!frontImageLink) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.S3_FRONT_STORE_ERROR,
          dataAvailable: false,
        });
      }
      let backImageLink = null;
      if (back) {
        backImageLink = await textractService.storeFileInS3(back);
        if (!backImageLink) {
          return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
            message: constants.MESSAGES.S3_BACK_STORE_ERROR,
            dataAvailable: false,
          });
        }
      }
      /* console.log(relevantText); */
      fs.unlinkSync(front.path);
      fs.unlinkSync(back.path);
      const validJsonData = textractService.ifValidJSON(req.body.relevantText);
      const userDetails = await textractService.createUserDetails(validJsonData,
        req.user, frontImageLink, backImageLink, req.body.idType);
      if (!userDetails) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_DETAILS_STORE_FAILED,
          userDetails,
          dataAvailable: false,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.USER_DETAILS_STORE_SUCCESS,
        userDetails,
        dataAvailable: true,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.USER_DETAILS_STORE_FAILED,
          error,
        });
    }
  },
  getUserDetails: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_LOGGED_IN,
          dataAvailable: false,
        });
      }
      const userDetails = await textractService.findUserDetails(req.user.userId);
      if (userDetails.length === 0) {
        return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_EXIST,
          userDetails,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.USER_DETAILS_GET,
        userDetails,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.USER_DETAILS_GET_FAILED,
          error,
        });
    }
  },
  /* - All APIs below are used for creating new fields in MongoDB collection
    - not to be integrated with Frontend */
  createEntryInDataFields: async (req, res) => {
    try {
      const inputData = req.body.data;
      for (let i = 0; i < inputData.length; i += 1) {
        const { verificationEntities } = inputData[i];
        const idTypeObjectIds = await textractService.getObjectIdFromIdType(verificationEntities);
        const data = new DataField({
          fieldName: inputData[i].fieldName,
          fieldAbstraction: inputData[i].fieldAbstraction,
          verificationEntities: idTypeObjectIds,
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
  createEntryInIdType: async (req, res) => {
    try {
      const inputData = req.body.data;
      for (let i = 0; i < inputData.length; i += 1) {
        const data = new IdType({
          name: inputData[i].name,
          shortName: inputData[i].shortName,
        });
        const idTypeData = await textractService.createIdType(data);
        if (!idTypeData) {
          return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
            message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
            dataAvailable: false,
          });
        }
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.IDTYPE_CREATED,
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

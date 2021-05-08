const verifierService = require('../../services/verifierServices/verify');
const constants = require('../../../utils/constants');
const _ = require('lodash');
const verificationEntity = require('../../daos/verificationEntity/verificationEntity');
const https = require('https');
const axios = require('axios');

module.exports = {
  getVerifierData: async (req, res) => {
    try {
      if (!req.user) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_LOGGED_IN,
          dataAvailable: false,
        });
      }
      if (req.user.type && req.user.type != 'verifier') {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_VERIFIER,
          dataAvailable: false,
        }); 
      }
      const verifierIdType = await verifierService.getVerifierById(req.user.userId);
      const verifierData = await verifierService.getAllUsersByVerifierDoc(verifierIdType);
      if (!verifierData) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.FAILED_VERIFIER_DATA,
          dataAvailable: false,
        });
      }
      if(verifierData.length == 0) {
        return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
          message: constants.MESSAGES.NO_VERIFIER_DATA,
          verifierData,
          dataAvailable: false,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.VERIFIER_DATA_SUCCESS,
        verifierData,
        dataAvailable: !!_.isPlainObject(verifierData),
      });
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.VERIFIER_DATA_FAILED,
          error,
      });
    }
  },
  updateUserDataByVerifier: async(req, res) => {
    try{
      if (!req.user) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.USER_NOT_LOGGED_IN,
          dataAvailable: false,
       });
      }
      if (req.user.type && req.user.type != 'verifier') {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_VERIFIER,
          dataAvailable: false,
        }); 
      }
      const userDetails = req.body.userDetails;
      if (userDetails.verifierApproval[0].status === 'APPROVED') {
        const verfierData = await verificationEntity.findVerifierById(req.user.userId);
        const blockchainData = {
          userId: req.user.userId,
          docType: verfierData.idtype,
          verifier: verfierData.idtype == 'CADL'?'DL Authority':'Passport Authority',
        }
  
        const agent = new https.Agent({  
          rejectUnauthorized: false
         });
         
         axios.post(constants.ENV_VARIABLES.BLOCKCHAIN_HOST + '/resources', blockchainData, { httpsAgent: agent })
         .then(async (blockchainResponseJson) => {
           console.log(blockchainResponseJson.data);
           if (blockchainResponseJson.status == '200') {
            const walletId = blockchainResponseJson.data.walletId;
            if (!walletId) {
              return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send({
                message: constants.MESSAGES.FAILED_BLOCKCHAIN_STORE_INFORMATION,
                dataAvailable: false,
              });
            }

            const updatedUserData = await verifierService.updateUserData(userDetails, req.user.userId, walletId, userDetails.verifierApproval[0].idType);
              if (!updatedUserData) {
                return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
                  message: constants.MESSAGES.FAILED_USER_UPDATE,
                  dataAvailable: false,
                });
              }
              return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
                message: constants.MESSAGES.UPDATE_USER_DATA_SUCCESS,
                updatedUserData,
                dataAvailable: !!_.isPlainObject(updatedUserData),
              });
          }
          
         });
  
        //await verifierService.getWalletIdFromBlockchainService(userDetails.userId, req.user.userId);
      
        }
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.FAILED_USER_UPDATE,
          error,
      });
    }
  },
}

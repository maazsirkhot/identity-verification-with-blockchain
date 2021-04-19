const verifierService = require('../../services/verifierServices/verify');
const constants = require('../../../utils/constants');
const _ = require('lodash');

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
      if (userDetails.verifierApproval.status === 'APPROVED') {
        const walletId = await verifierService.getWalletIdFromBlockchainService(userDetails.userId, req.user.userId);
        if (!walletId) {
          return res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS).send({
            message: constants.MESSAGES.FAILED_BLOCKCHAIN_STORE_INFORMATION,
            dataAvailable: false,
          });
        }
      }
      const updatedUserData = await verifierService.updateUserData(userDetails, req.user.userId, walletId);
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

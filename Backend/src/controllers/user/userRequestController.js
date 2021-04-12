const constants = require('../../../utils/constants');
const userRequestService = require('../../services/userServices/userRequestService');

module.exports = {
  getUserRequest: async (req, res) => {
    try {
      const result = await userRequestService.getUserRequestService(
        req.params.email,
      );

      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
          message: constants.MESSAGES.NO_DATA_AVAILABLE,
          dataAvailable: result.dataAvailable,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
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
  requestAction: async (req, res) => {
    try {
      const result = await userRequestService.requestActionService(
        req.params.requestId,
        req.body.action,
      );

      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
          message: constants.MESSAGES.NO_DATA_AVAILABLE,
          dataAvailable: result.dataAvailable,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
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

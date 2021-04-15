/* eslint-disable max-len */
const constants = require('../../../utils/constants');
const customRequestService = require('../../services/clientServices/customRequestService');

module.exports = {
  newCustomRequest: async (req, res) => {
    try {
      if (req.user.type !== 'client') {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_CLIENT_USER,
          dataAvailable: false,
        });
      }
      const client = {
        userId: req.user.userId,
        username: req.user.username,
        email: req.user.email,
      };
      const { fieldsAdded } = req.body;
      const { name } = req.body;

      const result = await customRequestService.newUserService(client, name, fieldsAdded);

      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: result.message ? result.message : constants.MESSAGES.NO_DATA_AVAILABLE,
          dataAvailable: result.dataAvailable,
        });
      }
      return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send(result);
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
  fetchCustomRequests: async (req, res) => {
    try {
      const result = await customRequestService.fetchCustomRequestsService(req.user.userId);

      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.NO_DATA_AVAILABLE,
          dataAvailable: result.dataAvailable,
        });
      }
      return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send(result);
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
  fetchCustomRequestsByName: async (req, res) => {
    try {
      const name = req.params.customRequestName;
      const result = await customRequestService.fetchCustomRequestsByNameService(name, req.user.userId);

      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.NO_DATA_AVAILABLE,
          dataAvailable: result.dataAvailable,
        });
      }
      return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send(result);
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
  updateCustomRequest: async (req, res) => {
    try {
      if (req.user.type !== 'client') {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_CLIENT_USER,
          dataAvailable: false,
        });
      }

      const clientUserId = req.user.userId;
      const { customRequestObjectId } = req.params;
      const customReqDetails = req.body;

      const result = await customRequestService.updateCustomRequestService(clientUserId, customRequestObjectId, customReqDetails);
      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.NO_DATA_AVAILABLE,
          dataAvailable: result.dataAvailable,
        });
      }
      return res.status(constants.STATUS_CODE.CREATED_SUCCESSFULLY_STATUS).send(result);
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

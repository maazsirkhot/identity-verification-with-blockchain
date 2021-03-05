const constants = require('../../../utils/constants');
const systemInfoFieldsService = require('../../services/systemServices/systemInfoFieldsService');

module.exports = {
  getAllInfoFields: async (req, res) => {
    try {
      const result = await systemInfoFieldsService.getInfoFieldsService({});

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

      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
    } catch (error) {
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  getInfoField: async (req, res) => {
    try {
      const options = {
        fieldName: req.params.fieldName,
        isActive: true,
      };
      const result = await systemInfoFieldsService.getInfoFieldsService(
        options,
      );

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

      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
    } catch (error) {
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  createInfoField: async (req, res) => {
    try {
      const newField = {
        fieldName: req.body.fieldName,
        fieldAbstraction: req.body.fieldAbstraction,
        verificationEntities: req.body.verificationEntities,
        verficationMethod: !req.body.verficationMethod
          ? null
          : req.body.verficationMethod,
        verificationAPI: !req.body.verificationAPI
          ? null
          : req.body.verficationMethod,
      };
      const result = await systemInfoFieldsService.createInfoFieldService(
        newField,
      );

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

      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
    } catch (error) {
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  updateInfoField: async (req, res) => {
    try {
      const updateFields = req.body;
      const result = await systemInfoFieldsService.updateInfoFieldService(
        req.params.fieldName,
        updateFields,
      );

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

      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(result);
    } catch (error) {
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
};

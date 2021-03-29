const constants = require('../../../utils/constants');
const systemPermissionsService = require('../../services/systemServices/systemPermissionsService');

module.exports = {
  createPermission: async (req, res) => {
    try {
      const permission = {
        permissionName: req.body.permissionName,
        dataField: req.body.dataField,
      };

      const result = await systemPermissionsService.createPermissionService(
        permission,
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
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  getAllPermissions: async (req, res) => {
    try {
      const result = await systemPermissionsService.getPermissionsService({});

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
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  getPermission: async (req, res) => {
    try {
      const options = {
        permissionName: req.params.permissionName,
        isActive: true,
      };
      const result = await systemPermissionsService.getPermissionsService(
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
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  updatePermission: async (req, res) => {
    try {
      const updateFields = req.body;

      const result = await systemPermissionsService.updatePermissionService(
        req.params.permissionName,
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

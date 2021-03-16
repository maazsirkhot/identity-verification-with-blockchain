const constants = require('../../../utils/constants');
const systemRolesService = require('../../services/systemServices/systemRolesService');

module.exports = {
  createRole: async (req, res) => {
    try {
      const role = {
        roleName: req.body.roleName,
        permissions: req.body.permissions,
        createdBy: {
          type: req.user.type,
          id: req.user.id,
        },
        isDefault: req.user.type === 'system',
      };
      const result = await systemRolesService.createRoleService(role);

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
  getAllRoles: async (req, res) => {
    try {
      const result = await systemRolesService.getRolesService({});

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
  getRole: async (req, res) => {
    try {
      const options = {
        roleName: req.params.roleName,
        isActive: true,
      };
      const result = await systemRolesService.getRolesService(options);

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
  updateRole: async (req, res) => {
    try {
      const updateFields = req.body;

      const result = await systemRolesService.updateRoleService(
        req.params.roleName,
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

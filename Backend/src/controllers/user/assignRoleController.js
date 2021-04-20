const constants = require('../../../utils/constants');
const assignRoleService = require('../../services/userServices/assignRoleService');

module.exports = {
  createAssignRole: async (req, res) => {
    try {
      const user = {
        userId: req.user.userId,
        username: req.user.username,
        email: req.user.email,
      };
      const client = req.body.client;
      const role = req.body.role;
      const data = await assignRoleService.createassignRole(
        user,
        client,
        role,
        req.body.requestId,
        req.body.action
      );
      if (!data) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.FAILED_ROLE_ASSIGN,
          dataAvailable: false,
        });
      }
      if (!data.dataAvailable) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.FAILED_ROLE_ASSIGN,
          dataAvailable: false,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(data);
    } catch (error) {
      console.log(error);
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          dataAvailable: false,
          error,
        });
    }
  },
  postsForUser: async (req, res) => {
    try {
      const result = await fetchInfoService.postsForUserService(
        req.params.email,
        req.query.option
      );

      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          dataAvailable: false,
        });
      }

      if (!result.dataAvailable) {
        return res.status(constants.STATUS_CODE.NO_CONTENT_STATUS).send({
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

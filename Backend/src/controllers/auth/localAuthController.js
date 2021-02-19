const _ = require('lodash');
const constants = require('../../../utils/constants');
const localAuthService = require('../../services/authServices/localAuthService');

module.exports = {
  signup: async (req, res) => {
    try {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        isLocalAuth: true,
      };
      const data = await localAuthService.createUserService(user);
      if (!data) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          data,
          dataAvailable: false,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.USER_CREATED,
        data,
        dataAvailable: !!_.isPlainObject(data),
      });
    } catch (error) {
      return res
        .status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS)
        .send({
          message: constants.MESSAGES.SERVER_ERROR,
          error,
        });
    }
  },
  login: async (req, res) => {
    try {
      const data = {
        username: req.body.username,
        password: req.body.password,
      };
      const result = await localAuthService.loginUserService(data);
      console.log(result);
      if (!result) {
        return res.status(constants.STATUS_CODE.BAD_REQUEST_ERROR_STATUS).send({
          message: constants.MESSAGES.INVALID_PARAMETERS_ERROR,
          data: result,
          dataAvailable: false,
        });
      }
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send({
        message: constants.MESSAGES.LOGIN_SUCCESSFUL,
        data: result,
        dataAvailable: true,
      });
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

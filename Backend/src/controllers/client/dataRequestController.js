const constants = require('../../../utils/constants');
const dataRequestService = require('../../services/clientServices/dataRequestService');

module.exports = {
  newRequest: async (req, res) => {
    try {
      const creator = {
        userId: req.user.userId,
        username: req.user.username,
        email: req.user.email,
      };
      const user = {
        userId: req.body.user.userId,
        username: req.body.user.username,
        email: req.body.user.email,
      };
      const { fieldsRequested } = req.body;

      const result = await dataRequestService.newUserService(creator, user, fieldsRequested);

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

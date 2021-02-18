const constants = require('../../../utils/constants');

module.exports = {
  loginCallback: (req, res) => {
    try {
      // console.log(req);
      console.log(req.user);
      return res.status(constants.STATUS_CODE.SUCCESS_STATUS).send(req.user);
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

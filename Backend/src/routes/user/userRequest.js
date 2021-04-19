const express = require('express');
const passport = require('passport');

const router = express.Router();
const userRequestController = require('../../controllers/user/userRequestController');
const validator = require('../../middlewares/validators/user/userRequest');

router.get(
  '/',
  // validator.getUserRequest,
  passport.authenticate(['jwt'], { session: false }),
  userRequestController.getUserRequest,
);

router.post(
  '/:requestId',
  validator.requestAction,
  userRequestController.requestAction,
);

module.exports = router;

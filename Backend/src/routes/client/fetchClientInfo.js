const express = require('express');
const passport = require('passport');

const router = express.Router();
const fetchClientInfoController = require('../../controllers/client/fetchClientInfoController');
const validator = require('../../middlewares/validators/client/fetchClientInfo');

router.get(
  '/searchuser',
  validator.searchUser,
  passport.authenticate(['jwt'], { session: false }),
  fetchClientInfoController.searchUser,
);

module.exports = router;

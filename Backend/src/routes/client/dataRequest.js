const express = require('express');
const passport = require('passport');

const router = express.Router();
const dataRequestsController = require('../../controllers/client/dataRequestController');
const validator = require('../../middlewares/validators/client/dataRequest');

router.post(
  '/',
  validator.newRequest,
  passport.authenticate(['jwt'], { session: false }),
  dataRequestsController.newRequest,
);

module.exports = router;

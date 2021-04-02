const express = require('express');
const passport = require('passport');

const router = express.Router();
const dataRequestsController = require('../../controllers/client/dataRequestController');
const validator = require('../../middlewares/validators/client/request');

router.post(
  '/',
  validator.newRequest,
  passport.authenticate(['jwt'], { session: false }),
  dataRequestsController.newRequest,
);

router.get(
  '/',
  passport.authenticate(['jwt'], { session: false }),
  dataRequestsController.fetchRequests,
);

router.post(
  '/role',
  validator.requestRole,
  passport.authenticate(['jwt'], { session: false }),
  dataRequestsController.requestRole,
);

router.get(
  '/searchrequest',
  validator.searchrequest,
  passport.authenticate(['jwt'], { session: false }),
  dataRequestsController.searchRequests,
);

module.exports = router;

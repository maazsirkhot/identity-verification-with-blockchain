const express = require('express');
const passport = require('passport');

const router = express.Router();
const customRequestsController = require('../../controllers/client/customRequestsController');
const validator = require('../../middlewares/validators/client/customRequest');

router.post(
  '/',
  validator.newRequest,
  passport.authenticate(['jwt'], { session: false }),
  customRequestsController.newCustomRequest,
);

router.get(
  '/',
  passport.authenticate(['jwt'], { session: false }),
  customRequestsController.fetchCustomRequests,
);

router.get(
  '/:customRequestName',
  passport.authenticate(['jwt'], { session: false }),
  customRequestsController.fetchCustomRequestsByName,
);

router.put(
  '/:customRequestObjectId',
  validator.updateRequest,
  passport.authenticate(['jwt'], { session: false }),
  customRequestsController.updateCustomRequest,
);

module.exports = router;

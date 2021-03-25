const express = require('express');
const passport = require('passport');

const router = express.Router();
const roleManagementController = require('../../controllers/user/roleManagementController');
const validator = require('../../middlewares/validators/user/roleManagementValidator');

router.get(
  '/',
  validator.getRolesForUser,
  passport.authenticate(['jwt'], { session: false }),
  roleManagementController.getRolesForUser,
);

module.exports = router;

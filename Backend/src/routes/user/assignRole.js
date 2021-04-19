const express = require('express');
const passport = require('passport');

const router = express.Router();
const assignRoleController = require('../../controllers/user/assignRoleController');
const assignRoleValidator = require('../../middlewares/validators/user/assignRoleValidator');

router.post(
  '/',
  assignRoleValidator.createAssignRoleFields,
  passport.authenticate(['jwt'], {
    session: false,
  }),
  assignRoleController.createAssignRole,
);

module.exports = router;

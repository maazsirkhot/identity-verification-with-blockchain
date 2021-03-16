const express = require('express');
const passport = require('passport');

const router = express.Router();
const validator = require('../../middlewares/validators/system/systemRolesValidator');
const systemRolesController = require('../../controllers/system/systemRolesController');

router.post(
  '/',
  validator.createRole,
  passport.authenticate(['jwt'], { session: false }),
  systemRolesController.createRole,
);

router.get(
  '/',
  passport.authenticate(['jwt'], { session: false }),
  systemRolesController.getAllRoles,
);

router.get(
  '/:roleName',
  validator.getRole,
  passport.authenticate(['jwt'], { session: false }),
  systemRolesController.getRole,
);

router.put(
  '/:roleName',
  validator.updateRole,
  passport.authenticate(['jwt'], { session: false }),
  systemRolesController.updateRole,
);

module.exports = router;

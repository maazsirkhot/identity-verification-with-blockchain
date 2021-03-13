const express = require('express');
const passport = require('passport');

const router = express.Router();
const validator = require('../../middlewares/validators/system/systemPermissionsValidator');
const systemPermissionsController = require('../../controllers/system/systemPermissionsController');

router.post(
  '/',
  validator.createPermission,
  passport.authenticate(['jwt'], { session: false }),
  systemPermissionsController.createPermission,
);

router.get(
  '/',
  passport.authenticate(['jwt'], { session: false }),
  systemPermissionsController.getAllPermissions,
);

router.get(
  '/:fieldName',
  validator.getPermission,
  passport.authenticate(['jwt'], { session: false }),
  systemPermissionsController.getPermission,
);

router.put(
  '/:permissionName',
  validator.updatePermission,
  passport.authenticate(['jwt'], { session: false }),
  systemPermissionsController.updatePermission,
);

module.exports = router;

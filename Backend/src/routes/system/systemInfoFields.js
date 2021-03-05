const express = require('express');
const passport = require('passport');

const router = express.Router();
const validator = require('../../middlewares/validators/system/systemInfoFieldsValidator');
const systemInfoFieldsController = require('../../controllers/system/systemInfoFieldsController');

router.get(
  '/',
  passport.authenticate(['jwt'], { session: false }),
  systemInfoFieldsController.getAllInfoFields,
);
router.get(
  '/:fieldName',
  validator.getInfoField,
  passport.authenticate(['jwt'], { session: false }),
  systemInfoFieldsController.getInfoField,
);
router.post(
  '/',
  validator.createInfoField,
  passport.authenticate(['jwt'], { session: false }),
  systemInfoFieldsController.createInfoField,
);
router.put(
  '/:fieldName',
  validator.updateInfoField,
  passport.authenticate(['jwt'], { session: false }),
  systemInfoFieldsController.updateInfoField,
);

module.exports = router;

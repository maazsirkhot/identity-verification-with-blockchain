const express = require('express');
const passport = require('passport');

const router = express.Router();
const fetchInfoController = require('../../controllers/user/fetchInfoController');
const validator = require('../../middlewares/validators/user/fetchInfoValidator');

router.get(
  '/datafields/:email',
  validator.userDataFields,
  passport.authorize(['jwt'], {
    session: false,
  }),
  fetchInfoController.userDataFields,
);

module.exports = router;

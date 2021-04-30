const express = require('express');
const passport = require('passport');

const router = express.Router();
const fetchInfoController = require('../../controllers/user/fetchInfoController');
const validator = require('../../middlewares/validators/user/fetchInfoValidator');

router.get(
  '/posts/:email',
  validator.postsForUser,
  passport.authenticate(['jwt'], {
    session: false,
  }),
  fetchInfoController.postsForUser,
);

router.get(
  '/profile',
  validator.getProfile,
  passport.authenticate(['jwt'], {
    session: false,
  }),
  fetchInfoController.profileForUser,
);

router.put(
  'profile/setdocument',
  // validator.setDocumentForUser,
  passport.authenticate(['jwt'], {
    session: false,
  }),
  fetchInfoController.setDocumentForUser,
);
module.exports = router;

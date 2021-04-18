const express = require('express');
const passport = require('passport');

const router = express.Router();
const fetchInfoController = require('../../controllers/user/fetchInfoController');
const validator = require('../../middlewares/validators/user/fetchInfoValidator');

router.get(
  '/posts/:email',
  validator.postsForUser,
  passport.authorize(['jwt'], {
    session: false,
  }),
  fetchInfoController.postsForUser,
);

router.get(
  '/profile/',
  passport.authorize(['jwt'], {
    session: false,
  }),
  fetchInfoController.profileForUser,
);

module.exports = router;

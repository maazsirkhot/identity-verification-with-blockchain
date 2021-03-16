const express = require('express');
const passport = require('passport');

const router = express.Router();

const verifierController = require('../../controllers/verifier/verifierController');

router.get('/getVerifierData', passport.authenticate(['jwt'], {
    session: false,
  }), verifierController.getVerifierData);

module.exports = router;
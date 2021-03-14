const express = require('express');
const passport = require('passport');

const router = express.Router();

const verifierController = require('../../controllers/verifier/verifierController');

router.get('/getVerifierData', passport.authenticate(['jwt'], {
    session: false,
  }), verifierController.getVerifierData);

router.post('/updateUserData', passport.authenticate(['jwt'], {
    session: false,
  }), verifierController.updateUserDataByVerifier);

module.exports = router;
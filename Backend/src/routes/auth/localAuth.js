const express = require('express');

const router = express.Router();
const localAuthController = require('../../controllers/auth/localAuthController');
const validator = require('../../middlewares/validators/auth/localAuthValidator');

router.post('/signup', validator.signup, localAuthController.signup);
router.post('/login', validator.login, localAuthController.login);

module.exports = router;

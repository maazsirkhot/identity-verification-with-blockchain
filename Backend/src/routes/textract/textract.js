const express = require('express');
const multer = require('multer');
const passport = require('passport');

const upload = multer({ dest: './images' });

const router = express.Router();
const textractController = require('../../controllers/textract/textractController');
/* Will integrate this in next Push */
/* const validator = require('../../validators/textract/textractValidator'); */

router.post('/getUserDetails', passport.authenticate(['jwt'], {
    session: false,
  }), upload.array('documents'), textractController.fetchUserDetailsFromId);
router.post('/storeUserDetails', passport.authenticate(['jwt'], {
    session: false,
  }), upload.array('documents'), textractController.storeUserDatainDatabase);
router.get('/getUserDetailsfromDB', passport.authenticate(['jwt'], {
    session: false,
  }), textractController.getUserDetails);
router.post('/createEntryInDataFields', textractController.createEntryInDataFields);
router.post('/createEntryInIdType', textractController.createEntryInIdType);

module.exports = router;

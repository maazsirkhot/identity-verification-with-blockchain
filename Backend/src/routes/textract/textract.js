const express = require('express');
const multer = require('multer');

const upload = multer({ dest: './images' });

const router = express.Router();
const textractController = require('../../controllers/textract/textractController');
/* Will integrate this in next Push */
/* const validator = require('../../validators/textract/textractValidator'); */

router.post('/getUserDetails', upload.array('documents'), textractController.fetchUserDetailsFromId);
router.post('/storeUserDetails', upload.array('documents'), textractController.storeUserDatainDatabase);
router.get('/getUserDetailsfromDB', textractController.getUserDetails);
router.post('/createEntryInDataFields', textractController.createEntryInDataFields);
router.post('/createEntryInIdType', textractController.createEntryInIdType);

module.exports = router;

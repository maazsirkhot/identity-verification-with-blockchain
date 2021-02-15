const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  console.log('Hello World');
  res.status(200).send('Route Successful');
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const morganBody = require('morgan-body');
const createError = require('http-errors');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
// const multer = require('multer');

const config = require('./bin/config');
const constants = require('./utils/constants');
// const textract = require('./awstextract/textract');
// const upload = multer({ dest: './images' });

// Database Connections
require('./src/models/postgres/index');
require('./src/models/mongoDB/index');

const app = express();

app.use(morgan('dev'));
morganBody(app, {
  noColors: true,
  stream: fs.createWriteStream(path.join(__dirname, 'logs/detailedLogs.log'), {
    flags: 'a',
  }),
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE',
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: false }));

app.get('/ping', (req, res) => res.status(200).send());

// API to use Amazon Textract
// app.post('/fetchUserDetailsFromId', upload.single('document'), (req, res) => {
//   textract.fetchUserDetailsFromId(req, res);
// });

// // API to test
// app.get('/test', (req, res) => {
//   textract.getRelevantText(req, res);
// });

// Routes
require('./src/routes/auth/index')(app);

app.use((req, res, next) => {
  next(createError(404));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // console.error(err.stack);
  res.status(constants.STATUS_CODE.INTERNAL_SERVER_ERROR_STATUS);
  res.send({ error: err });
});

app.listen(config.PORT, () => {
  console.log(`Server Listening on port ${config.PORT}`);
});

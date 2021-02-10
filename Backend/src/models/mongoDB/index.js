const mongoose = require('mongoose');
const config = require('../../../bin/config.js');

mongoose
  .connect(config.DATABASE.MONGO.CONN_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    poolSize: 100,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

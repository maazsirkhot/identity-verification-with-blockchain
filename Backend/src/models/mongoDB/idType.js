const mongoose = require('mongoose');

const idTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
  },
);
const idType = mongoose.model('idType', idTypeSchema);
module.exports = idType;

const mongoose = require('mongoose');

const dataFieldSchema = new mongoose.Schema(
  {
    fieldName: {
      type: String,
      required: true,
    },
    fieldAbstraction: {
      parameters: [String],
      method: {
        type: String,
      },
    },
    verificationEntities: {
      /* Need to change this to Object Id when idtype collection will be ready */
      type: [String],
      required: true,
    },
    verificationMethod: {
      type: String,
    },
    verificationAPI: {
      uri: {
        type: String,
      },
      method: {
        type: String,
      },
      parameters: {
        query: [String],
        path: [String],
        body: [String],
      },
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);
const dataField = mongoose.model('dataField', dataFieldSchema);
module.exports = dataField;

const mongoose = require('mongoose');

const userFieldSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    dataField: [
      {
        field_id: {
          type: String,
          required: true,
        },
        field_name: {
          type: String,
          required: true,
        },
        field_value: {
          type: String,
          required: true,
        },
        dataReference: {
          type: String,
          required: false,
        },
        isVerified: {
          type: Boolean,
          required: true,
          default: false,
        },
        permissions: {
          type: [Object],
          required: false,
        },
        verifierDoc: {
          docId: {
            type: mongoose.Types.ObjectId, // Reference to idType collection
            required: true,
          },
          docName: {
            type: String,
            required: true,
          },
          docshortName: {
            type: String,
            required: true,
          },
        },
      }],
  },
);
const userFields = mongoose.model('userFields', userFieldSchema);
module.exports = userFields;

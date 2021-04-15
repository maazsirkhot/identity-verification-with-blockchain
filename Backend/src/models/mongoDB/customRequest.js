const mongoose = require('mongoose');

const customRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    client: {
      userId: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
    },
    fieldsAdded: [{
      fieldId: { 
        type: String,
        required: true,
      },
      fieldName: { 
        type: String,
        required: true,
      },
      isAbstracted: { 
        type: String,
        required: true,
      },
      abstractionParams: [], 
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('customRequest', customRequestSchema);

const mongoose = require('mongoose');

const dataRequestSchema = new mongoose.Schema(
  {
    creator: {
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
    user: {
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
    fieldsRequested: [{
      fieldId: { // dataField ID
        type: String,
        required: true,
      },
      fieldName: { // dataField Name
        type: String,
        required: true,
      },
      // Below two fields are added to permissions model as well to handle requesting roles
      isAbstracted: { // From Frontend
        type: String,
        required: true,
      },
      abstractionParams: [], // From Frontend
    }],
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
      required: true,
    },
    comment: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('dataRequest', dataRequestSchema);

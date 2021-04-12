const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
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
    expiry: {
      expireTime: {
        type: Date,
        required: true,
      },
      isExpired: {
        type: Boolean,
        required: true,
      },
    },
    // Populated from Roles -> Permissions -> DataFields
    userDataFields: [{
      field_id: {
        type: String,
        required: true,
      },
      field_name: {
        type: String,
        required: true,
      },
      field_value: { // If isAbstracted TRUE in Request, then show abstracted value
        type: String,
        required: true,
      },
      dataReference: { // Comes from userDataField --> Blockchain
        type: String,
        required: false,
      },
    }],
    dataRequest: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('post', postSchema);

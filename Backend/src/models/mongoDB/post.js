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
    role: {
      roleId: {
        type: String,
        required: true,
      },
      roleName: {
        type: String,
        required: true,
      },
      expireDurationInSecs: {
        type: Number,
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
      field_value: {
        type: String,
        required: true,
      },
      dataReference: {
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

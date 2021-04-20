const mongoose = require('mongoose');

const roleAssignSchema = new mongoose.Schema(
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
    requestId: {
      type: String,
      required: true,
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
    },
    userDataFields: [{ // to be done in the backend
      field_id: {
        type: String,
      },
      field_name: {
        type: String,
      },
      field_value: { // If isAbstracted TRUE in Request, then show abstracted value
        type: String,
      },
      dataReference: { // Comes from userDataField --> Blockchain
        type: String,
      },
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('roleAssign', roleAssignSchema);

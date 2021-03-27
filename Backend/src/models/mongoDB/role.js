const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default: true,
    },
    createdBy: {
      type: {
        type: String,
        enum: ['system', 'user'],
      },
      id: {
        type: String,
        required: true,
      },
    },
    isDefault: {
      type: Boolean,
      required: true,
    },
    permissions: [{
      id: {
        type: String,
        required: true,
      },
      /**
       * This attribute stores the time in seconds for which the role would provide access to a
       * particular permission. When the role is assigned, this number will be added to the assigned
       * time to set the actual expiry of the access. Ensure the date or timestamp is converted into
       * seconds before putting it here.
       */
      expireDurationInSecs: {
        type: Number,
        required: true,
      },
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('role', roleSchema);

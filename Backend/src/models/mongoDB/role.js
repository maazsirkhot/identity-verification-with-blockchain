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
    dataFields: [{
      fieldId: {
        type: String,
        required: true,
      },
      fieldName: {
        type: String,
        required: true,
      },
      abstractionParam: {
        type: mongoose.Mixed,
      },
    }],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('role', roleSchema);

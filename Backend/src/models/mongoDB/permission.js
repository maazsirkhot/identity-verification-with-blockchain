const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
  {
    permissionName: {
      type: String,
      required: true,
      unique: true,
    },
    dataField: {
      id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      fieldName: {
        type: String,
        required: true,
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

module.exports = mongoose.model('permission', permissionSchema);

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
        type: String,
        required: true,
      },
      fieldName: {
        type: String,
        required: true,
      },
      isAbstracted: { // From System
        type: String,
        required: true,
      },
      abstractionParams: [], // From System
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

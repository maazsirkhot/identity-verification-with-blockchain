const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
  {
    permissionName: {
      type: String,
      required: true,
    },
    dataField: {
      parameters: [String],
      method: {
        type: String,
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

export default mongoose.model('permission', permissionSchema);

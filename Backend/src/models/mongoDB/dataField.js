const mongoose = require('mongoose');

const dataFieldSchema = new mongoose.Schema(
  {
    fieldName: {
      type: String,
      required: true,
    },
    fieldAbstraction: {
      parameters: [String],
      method: {
        type: String,
      },
      required: true,
    },
    verificationEntities: [
      {
        id: {
          type: mongoose.Types.ObjectId,
          required: true,
        },
      },
    ],
    verificationMethod: {
      type: String,
    },
    verificationAPI: {
      uri: {
        type: String,
      },
      method: {
        type: String,
      },
      parameters: {
        query: [String],
        path: [String],
        body: [String],
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

export default mongoose.model('dataField', dataFieldSchema);

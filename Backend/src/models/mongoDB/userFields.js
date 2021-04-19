const mongoose = require('mongoose');

const userFieldSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    verifierApproval: {
      status: {
        type: String,
        enum: ['APPROVED', 'REJECTED', 'PENDING'],
        default: 'PENDING',
      },
      comments: {
        type: String,
        default: null,
      },
      verifiedBy: {
        type: String,
        default: null,
      },
    },
    docImage: {
      front: {
        type: String,
        required: true,
      },
      back: {
        type: String,
      },
    },
    dataField: [
      {
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
        isVerified: {
          type: Boolean,
          required: true,
          default: false,
        },
        isCurrent: {
          type: Boolean,
          required: true,
          default: false,
        },
        permissions: {
          type: [Object],
          required: false,
        },
        verifierDoc: {
          docId: {
            type: mongoose.Types.ObjectId, // Reference to idType collection
            required: true,
          },
          docName: {
            type: String,
            required: true,
          },
          docshortName: {
            type: String,
            required: true,
          },
        },
      }],

  },
  {
    timestamps: { createdAt: true, updatedAt: true },
  },
);
const userFields = mongoose.model('userFields', userFieldSchema);
module.exports = userFields;

const mongoose = require('mongoose');

const dataRequestSchema = new mongoose.Schema(
  {
    creator: {
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
    fieldsRequested: [mongoose.Types.ObjectId], // dataField ID
    status: {
      type: String,
      enum: ['accepted', 'rejected', 'pending'],
      default: 'pending',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('dataRequest', dataRequestSchema);

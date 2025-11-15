const mongoose = require('mongoose');

const finishPositionSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  carNumber: {
    type: Number,
    min: 0,
    required: true,
  },
  interval: {
    type: String,
    required: true,
  },
  lapsLed: {
    type: Number,
    min: 0,
    required: true,
  },
  lapsCompleted: {
    type: Number,
    min: 0,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  // owner: {
  //   type: mongoose.Schema.ObjectId,
  //   required: true,
  //   ref: 'Championship',
  // },
  createdDate: {
    type: Date,
    default: Date.now,
  },
}, { autoCreate: false });

const FinishPositionModel = mongoose.model('FinishPosition', finishPositionSchema);
module.exports = {
  FinishPositionModel,
  finishPositionSchema,
};

const mongoose = require('mongoose');

const startPositionSchema = new mongoose.Schema({
  driverName: {
    type: String,
    required: true,
  },
  carNumber: {
    type: Number,
    min: 0,
    required: true,
  },
  speed: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Championship',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
}, {autoCreate: false});

const StartPositionModel = mongoose.model('StartPosition', startPositionSchema);
module.exports = {
  StartPositionModel,
  startPositionSchema,
};

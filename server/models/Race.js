const mongoose = require('mongoose');
// const _ = require('underscore');
const { finishPositionSchema } = require('./finishPosition.js');
const { startPositionSchema } = require('./startPosition.js');

// const setName = (name) => _.escape(name).trim();

const RaceSchema = new mongoose.Schema({
  raceNumber: {
    type: Number,
    min: 1,
    required: true,
  },
  raceData: {
    type: Date,
    required: true,
  },
  startPositions: [startPositionSchema],
  finishPositions: [finishPositionSchema],
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

RaceSchema.statics.toAPI = (doc) => ({
  raceNumber: doc.raceNumber,
});

const RaceModel = mongoose.model('Race', RaceSchema);
module.exports = {
  RaceModel,
  RaceSchema,
};

const mongoose = require('mongoose');
const _ = require('underscore');
const { RaceSchema } = require('./Race.js');

const setName = (name) => _.escape(name).trim();

const ChampionshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  races: [RaceSchema],
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

ChampionshipSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  races: doc.races,
});

const ChampionshipModel = mongoose.model('Championship', ChampionshipSchema);
module.exports = ChampionshipModel;

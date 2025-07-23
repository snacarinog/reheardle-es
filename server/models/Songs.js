// server/models/Song.js
const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  artist: { type: String, required: true },
  title: { type: String, required: true },
  fullName: { type: String, required: true },
  audioPath: { type: String, required: true }
});

module.exports = mongoose.model('Song', SongSchema);
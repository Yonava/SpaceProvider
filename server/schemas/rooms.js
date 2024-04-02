const mongoose = require('mongoose');
const { Schema } = mongoose;

const room = Schema({
  building: String,
  room: String,
  access_notes: String,
  images: [String],
  gps_coords: {
    lat: Number,
    lon: Number
  },
  labels: [String],
  capacity: Number,
  last_edited: Date
});

module.exports = mongoose.model('Room', room);
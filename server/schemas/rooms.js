/**
 * @module server/schemas/rooms
 * @desc Mongoose schema for rooms - spec. StudySpace Entities document
 * @requires {@link external:mongoose}
 * @requires {@link external:mongoose.Schema}
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const room = Schema({
  building: String,
  room: String,
  access_notes: String,
  images: [String],
  gps_coords: {
    type: { type: String, default: 'Point' }, // GeoJSON type
    coordinates: { type: [Number], default: [0, 0] } // Longitude (lon), Latitude (lat)
  },
  labels: [String],
  capacity: Number,
  last_edited: Date
});

room.index({ gps_coords: '2dsphere' });

module.exports = mongoose.model('Room', room);
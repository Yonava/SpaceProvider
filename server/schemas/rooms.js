/**
 * @module server/schemas/rooms
 * @desc Mongoose schema for rooms - spec. StudySpace Entities document
 * @requires {@link external:mongoose}
 * @requires {@link external:mongoose.Schema}
 */

const mongoose = require('mongoose');
const { Schema } = mongoose;

const roomShape = {
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
}

const room = Schema(roomShape);
room.index({ 'gps_coords': '2dsphere' });

module.exports = mongoose.model('Room', room);
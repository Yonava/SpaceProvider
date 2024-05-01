/**
 * @module server/schemas/rooms
 * @desc Mongoose schema for rooms - spec. StudySpace Entities document
 * @requires {@link external:mongoose}
 * @requires {@link external:mongoose.Schema}
 */

// fn(optimalRoom: {building: string, room: string, labels: string[] }) => Promise<{
//  room: Room,
//  rank: number
// }[]>

// maybe 50-60 documents. A good heuristic for querying mongoose, is that your match score should be at least 50% for even the lowest match rank document for your request

// 100% match means it literally has everything that the optimal room has, exactly.

const mongoose = require('mongoose');
const { Schema } = mongoose;

const room = Schema({
  building: String, // 'wustor'
  room: String, // '204'
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
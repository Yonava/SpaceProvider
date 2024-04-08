const express = require('express');
const router = express.Router();
const Room = require('../../schemas/rooms');

const BATCH_GET_PROJ = {
  images: { $slice: 1 },
}

const ERRORS = {
  INVALID_ROOM_ID: 'INVALID_ROOM_ID',
  INVALID_GPS_COORDS: 'INVALID_GPS_COORDS',
  INVALID_PAGE_PARAMS: 'INVALID_PAGE_PARAMS',
  UNKNOWN_EXCEPTION: 'UNKNOWN_EXCEPTION',
}

/**
 * @typedef {Object} ErrorOptions
 * @property {string} message - the error message
 * @property {string} error - the error code defined in ERRORS
 */

/**
  Terminates the request with an error response
  @param {Object} res - the response object
  @param {Object} errOptions - the error options object
*/
const respondWithError = (res) => (errOptions) => {
  res.status(400).json(errOptions);
}

router.get('/', async (req, res) => {

  const sendError = respondWithError(res);

  // if the query has a room parameter, return the room with that id
  if (req.query.room) {
    const { room } = req.query;
    const [building, roomNum] = room.split('-');
    if (!building || !roomNum) {
      return sendError({
        message: 'Invalid room parameter. Must be in the format building-room',
        error: ERRORS.INVALID_ROOM_ID
      });
    }

    try {
      const room = await Room.findOne({
        building,
        room: roomNum
      });
      res.json(room);
    } catch (error) {
      return sendError({
        message: `error fetching room from database with the provided room parameter ${building} ${roomNum}`,
        error: ERRORS.UNKNOWN_EXCEPTION
      });
    }
    return;
  }

  if (req.query._id) {
    const { _id } = req.query;
    try {
      const room = await Room.findById(_id);
      res.json(room);
    } catch (error) {
      return sendError({
        message: `error fetching room from database with the provided _id ${_id}`,
        error: ERRORS.UNKNOWN_EXCEPTION
      });
    }
    return;
  }

  // for batch get requests, takes pagination parameters
  const { limit, skip } = req.query;
  const limitNum = parseInt(limit) || 3;
  const skipNum = parseInt(skip) || 0;

  if (isNaN(limitNum) || isNaN(skipNum)) {
    return sendError({
      message: 'Invalid limit/skip parameters. Both must be provided and be numbers',
      error: ERRORS.INVALID_PAGE_PARAMS
    });
  }

  const batchGetOptions = {};

  // if query parameter is provided, we run a search on the database for best matches
  // TODO needs improvement for better search results!
  if (req.query.q) {
    const { q } = req.query;
    const query = q.split(' ').map((word) => new RegExp(word, 'i'));
    const searchableFields = ['building', 'room'];
    batchGetOptions['$or'] = searchableFields.map((field) => ({
      [field]: { $in: query }
    }));
  }

  // if location parameters are provided, return rooms will be sorted by distance
  // lat cannot be provided without lon and vice versa
  if (req.query.lat || req.query.lon) {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return sendError({
        message: 'Invalid lat/lon parameters. Both must be provided',
        error: ERRORS.INVALID_GPS_COORDS
      });
    }

    const latNum = parseFloat(lat);
    const lonNum = parseFloat(lon);

    if (isNaN(latNum) || isNaN(lonNum)) {
      return sendError({
        message: 'Invalid lat/lon parameters. Both must be numbers',
        error: ERRORS.INVALID_GPS_COORDS
      });
    }

    const geoLocationQuery = {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [lonNum, latNum]
        }
      }
    }

    batchGetOptions['gps_coords'] = geoLocationQuery;
  }

  try {
    const rooms = await Room
      .find(batchGetOptions, BATCH_GET_PROJ)
      .limit(limitNum)
      .skip(skipNum);

    const page = {
      limit: limitNum,
      skip: skipNum,
      results: rooms.length,
    }

    const options = {
      query: req.query.q,
      lat: batchGetOptions?.gps_coords?.$near.$geometry.coordinates[1],
      lon: batchGetOptions?.gps_coords?.$near.$geometry.coordinates[0],
    }

    res.json({
      page,
      options,
      rooms
    });
  } catch (error) {
    res.status(500).json({
      message: 'error occurred while batch fetching rooms from database',
      error: ERRORS.UNKNOWN_EXCEPTION
    });
  }
});

module.exports = router;
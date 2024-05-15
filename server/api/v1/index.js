/**
 * @module api/v1
 * @desc API routes for the SpaceProvider API version 1
 * @requires {@link external:express}
 * @requires {@link module:server/schemas/rooms}
 * @requires {@link module:server/constants}
 */

const express = require('express');
const { ERRORS, respondWithError } = require('../../constants');
const Room = require('../../schemas/rooms');
const router = express.Router();
const parseQueryString = require('../../queryStringParser');
const { rank } = require('../../query-rank');

/**
 * Default pagination options for batch get requests
 * @property {number} limit - the max number of results per page
 * @property {number} page - the page of results to get. One indexed
 */
const PAGINATION_DEFAULTS = {
  limit: 1,
  page: 1,
}

/**
 * @GET /api/v1
 * @description Get rooms from the SpaceProvider database based on query parameters
 * @query {string} room - the room to get, formatted as building-room
 * @query {string} _id - the mongo assigned id of the room to get
 * @query {string} q - search query to match against all rooms
 * @query {number} lat - latitude for sorting queried rooms by distance
 * @query {number} lon - longitude for sorting queried rooms by distance
 * @query {number} [limit=20] - pagination option to set the max number of results per page. Default is 20
 * @query {number} [page=1] - pagination option to get a specific page of results. One indexed. Default is 1
 */
router.get('/', async (req, res) => {

  const sendError = respondWithError(res);

  console.log('started get request')

  // if the query has a room parameter, return room with corresponding building-room combination
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
        error: ERRORS.UNKNOWN_EXCEPTION,
        status: 500,
      });
    }
    return;
  }

  // if the query has an _id parameter, return the room with that mongo assigned id
  if (req.query._id) {
    const { _id } = req.query;
    try {
      const room = await Room.findById(_id);
      res.json(room);
    } catch (error) {
      return sendError({
        message: `error fetching room from database with the provided _id ${_id}`,
        error: ERRORS.UNKNOWN_EXCEPTION,
        status: 500,
      });
    }
    return;
  }

  // for batch get requests, takes pagination parameters
  const { limit, page } = { ...PAGINATION_DEFAULTS, ...req.query };

  const limitNum = parseInt(limit);
  const pageNum = parseInt(page);

  if (isNaN(limitNum) || isNaN(pageNum)) {
    return sendError({
      message: 'Invalid limit/page parameters. Both must be provided and be numbers',
      error: ERRORS.INVALID_PAGE_PARAMS
    });
  }

  if (limitNum < 1 || pageNum < 1) {
    return sendError({
      message: 'Invalid limit/page parameters. Both must be greater than 0',
      error: ERRORS.INVALID_PAGE_PARAMS
    });
  }

  const batchGetOptions = {};

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

    console.log(geoLocationQuery)
    // TODO fix geo query
    // batchGetOptions['gps_coords'] = geoLocationQuery;
  }

  try {
    console.log('requesting rooms')

    const searchProjection = {
      _id: 1,
      building: 1,
      room: 1,
      labels: 1
    }

    const getProjection = {
      images: 0,//FIXME images: { $slice: 1 } 
    }

    // get initial batch of rooms (not ranked by query, without images)
    let rooms = await Room.find(batchGetOptions, searchProjection);
    if (req.query.q) { // if query parameter is provided, we run a search on the database for best matches
      const { q } = req.query;
      const roomQuery = parseQueryString(q);
      rooms = rank(roomQuery, rooms);
    }
    const skip = (pageNum - 1) * limitNum;
    // get found full room documents (only first image returned)
    rooms = await Promise.all(
      rooms.slice(skip, skip+limitNum).map(r => Room.findById(r._id, getProjection))
    );

    console.log('request complete')

    const total_results = await Room.countDocuments(batchGetOptions);
    const total_pages = Math.ceil(total_results / limitNum);
    const last_page = pageNum >= total_pages;

    const page = {
      limit: limitNum,
      page: pageNum,
      page_results: rooms.length,
      total_results,
      total_pages,
      last_page
    }

    const options = {
      query: req.query.q,
      lat: batchGetOptions?.gps_coords?.$near.$geometry.coordinates[1],
      lon: batchGetOptions?.gps_coords?.$near.$geometry.coordinates[0],
    }

    res.json({
      page,
      options,
      rooms: rooms.map(room => ({ //FIXME
        ...room._doc,
        images: []
      }))
    });
  } catch (error) {
    console.error('error', error);
    sendError({
      message: 'Error getting rooms',
      error: ERRORS.UNKNOWN_EXCEPTION,
      status: 500,
    });
  }
});

module.exports = router;
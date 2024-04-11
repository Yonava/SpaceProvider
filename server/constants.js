
/**
 * @module constants
 * @desc Defines constants for the server
 */

/**
 * @typedef {Object} ERRORS
 * @property {string} INVALID_ROOM_ID - error code for invalid room id
 * @property {string} INVALID_GPS_COORDS - error code for invalid gps coordinates
 * @property {string} INVALID_PAGE_PARAMS - error code for invalid page parameters
 * @property {string} UNKNOWN_EXCEPTION - error code for unknown exceptions
 * @property {string} RATE_LIMIT_EXCEEDED - error code for rate limit exceeded
 */
const ERRORS = {
  INVALID_ROOM_ID: 'INVALID_ROOM_ID',
  INVALID_GPS_COORDS: 'INVALID_GPS_COORDS',
  INVALID_PAGE_PARAMS: 'INVALID_PAGE_PARAMS',
  UNKNOWN_EXCEPTION: 'UNKNOWN_EXCEPTION',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
}

/**
 * @typedef {Object} ErrorOptions
 * @property {string} message - the error message
 * @property {string} error - the error code defined in ERRORS
 * @property {number} status - the status code of the error
 */

/**
  Terminates the request with an error response
  @param {Object} res - the response object
  @param {Object} errOptions - the error options object
*/
const respondWithError = (res) => (errOptions) => {
  const { status, ...rest } = errOptions;
  status ??= 400;
  res.status(status).json(rest);
}

module.exports = {
  ERRORS,
  respondWithError,
}
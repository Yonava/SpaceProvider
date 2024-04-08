/**
 * @module rateLimiter
 * @desc provides rate limiting middleware for the server
 */

const { ERRORS, respondWithError } = require('./constants');

/**
 * @typedef {Object} RATE_LIMITER_DEFAULTS
 * @desc defaults for rate limiting options
 */
const RATE_LIMITER_DEFAULTS = {
  requestLimit: 10,
  backoffDurationMs: 2000,
  paths: [],
}

/**
 * @desc provides a closure that limits the number of requests to the server on specific paths
 * @param {Object} options
 * @param {number} [options.requestLimit=10] - the number of requests allowed in the duration
 * @param {string[]} [options.paths=[]] - the paths to apply rate limiting to
 * @param {number} [options.backoffDurationMs=2000] - time it takes for the request count to decrement
 * @returns {Function} the rate limiting middleware
 */
function limitRequestRate(options) {

  const {
    requestLimit,
    paths,
    backoffDurationMs,
  } = { ...RATE_LIMITER_DEFAULTS, ...options };

  let numOfRequests = 0;

  return (req, res, next) => {

    numOfRequests++;
    setTimeout(() => numOfRequests--, backoffDurationMs);

    const onProtectedPath = paths.some(path => req.path.includes(path));
    if (!onProtectedPath) {
      next();
      return;
    }

    const underLimit = numOfRequests < requestLimit;
    if (underLimit) {
      next();
      return
    }

    respondWithError(res)({
      message: 'Rate limit exceeded',
      error: ERRORS.RATE_LIMIT_EXCEEDED,
      status: 429,
    });
  }
}

module.exports = {
  limitRequestRate,
};
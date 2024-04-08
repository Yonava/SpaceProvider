/**
 * @module rateLimiter
 * @desc provides rate limiting middleware for the server
 */

const { ERRORS, respondWithError } = require('./constants');

/**
 * @typedef {Object} RateLimitingOptions
 * @desc defaults for rate limiting options
 */
const defaultRateLimitingOptions = {
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
  } = { ...defaultRateLimitingOptions, ...options };

  let numOfRequests = 0;

  return (req, res, next) => {

    numOfRequests++;
    setTimeout(() => numOfRequests--, backoffDurationMs);

    const onProtectedPath = paths.some(path => req.path.includes(path));
    console.log('onProtectedPath', onProtectedPath);
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
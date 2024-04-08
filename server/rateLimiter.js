
/**
 * Rate limiting middleware
 *
 */

const defaultRateLimitingOptions = {
  requestLimit: 10,
  paths: ['/api/v1'],
  durationInMs: 2000,
}

export const limitRequestRate = (options) => {

  const {
    requestLimit,
    paths,
    durationInMs,
  } = { ...defaultRateLimitingOptions, ...options };

  let numOfRequests = 0;

  return (req, res, next) => {
    console.log(req.path)
    const onProtectedPath = paths.some(path => req.path.includes(path));
    if (onProtectedPath) {
      console.log('on protected path');
      next();
    } else {
      res.status(429).json({
        message: 'Rate limit exceeded, chill out',
      });
    }

    numOfRequests++;
    setTimeout(() => numOfRequests--, durationInMs);
  }
}
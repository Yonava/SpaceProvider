const { rateLimiter } = require('./rateLimiter');

describe('rateLimiter', () => {

  test('limits the number of requests to the server on specific paths', () => {
    const rateLimit = rateLimiter({
      requestLimit: 3,
      paths: ['/api'],
      backoffDurationMs: 1000,
    });

    const req = { path: '/api' };
    const res = { status: jest.fn() };
    const next = jest.fn();

    rateLimit(req, res, next);

    expect(next).toHaveBeenCalledTimes(1);
    rateLimit(req, res, next);
    expect(next).toHaveBeenCalledTimes(2);
    rateLimit(req, res, next);
    expect(next).toHaveBeenCalledTimes(3);
  });
});
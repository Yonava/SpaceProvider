const getIdealRoom = require('./queryStringParser');
const { rank: getRank, score: getScore } = require('./ernMatch');

describe('ernMatch', () => {

  test('recognizes a perfect match', () => {
    const idealRoom = getIdealRoom('woo 3040');
    const score = getScore(idealRoom, { building: 'woo', room: '3040' });
    expect(score).toBe(1);
  });

});
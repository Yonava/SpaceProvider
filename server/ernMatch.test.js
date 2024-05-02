const getIdealRoom = require('./queryStringParser');
const { rank: getRank, score: getScore } = require('./ernMatch');
const rooms = require('./mockRoomData')

describe('ernMatch', () => {

  test('recognizes a perfect match', () => {
    const idealRoom = getIdealRoom('woo 3040');
    const score = getScore(idealRoom, { building: 'woo', room: '3040' });
    expect(score).toBe(1);
  });

  test('rank returns the correct rank', () => {
    const idealRoom = getIdealRoom('woo 3040');
    const rankedRooms = getRank(idealRoom, rooms);
    expect(rankedRooms[0].room).toBe('3040');
  });

});
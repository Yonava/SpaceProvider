const getIdealRoom = require('./queryStringParser');
const { rank: getRank, score: getScore } = require('./query-rank');
const rooms = require('./mockRoomData')

describe('ernMatch', () => {

  test('recognizes a perfect match', () => {
    const idealRoom = getIdealRoom('woo 3040');
    const score = getScore(idealRoom, { building: 'woo', room: '3040' });
    expect(score).toBe(1);
  });

  test('rank returns the correct rank', () => {
    const idealRoom = getIdealRoom('woo 3040');
    const roomsRankedBasedOnScores = getRank(idealRoom, rooms);
    // The first room in the list should be the room closest to the ideal room
  });

});
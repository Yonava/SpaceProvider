
// for reference:
// type OptimalRoom = { building?: string, room?: string, labels?: string[] }

/**
 * @description Scores a given room based on how well it matches an optimal room
 * @param {OptimalRoom} optimalRoom - the ideal room to match against. Ma building, room, and labels
 * @param {Object} givenRoom - contains a superset of fields from optimalRoom
 * @returns {number} - the "match" score of the given room. 0 is no match, 1 is a perfect match
 */
const score = (optimalRoom, givenRoom) => {
  // TODO
  return 1;
}

/**
 * @description Ranks rooms based on how well they match an optimal room
 * @param {OptimalRoom} optimalRoom - the ideal room to match against. Contains building, room, and labels
 * @param {Object[]} rooms - the rooms to rank
 * @returns {{ room: Room, rank: number }[]} - the ranked rooms, sorted by rank in descending order
 */
const rank = (optimalRoom, rooms) => {
  // TODO
  return [];
}

module.exports = { score, rank };
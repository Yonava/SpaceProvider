// for reference:
// type OptimalRoom = { building?: string, room?: string, labels?: string[] }

// TODO: Map from building names to building aliases
const buildingAliases = undefined

/**
 * @description Scores a given room based on how well it matches an optimal room
 * @param {OptimalRoom} optimalRoom - the ideal room to match against. Ma building, room, and labels
 * @param {Object} givenRoom - contains a superset of fields from optimalRoom
 * @returns {number} - the "match" score of the given room. 0 is no match, 1 is a perfect match
 */
const score = (optimalRoom, givenRoom) => {
  const buildingScore = optimalRoom.building === undefined 
    ? 1 
    : 1 - levenshtein(optimalRoom.building, givenRoom.building)/Math.max(optimalRoom.building.length, givenRoom.building.length)
  const roomScore = optimalRoom.room === undefined 
    ? 1 
    : 1 // TODO
  return includesAll(optimalRoom.labels, givenRoom.labels) 
    ? (buildingScore + roomScore)/2 
    : 0
}

const includesAll = (arr1, arr2) => {
  for(let i = 0; i <= arr1.length; i++){
    if (!arr2.includes(arr1[i])) { return false; }
  }
  return true;
}

/**
 * Levenshtein distance between two strings
 * @param s1 string 1
 * @param s2 string 2
 * @returns number
 */
const levenshtein = (s1, s2) => {
  if (s1.length === 0) return s2.length;
  if (s2.length === 0) return s1.length;
  const arr = [Array(s1.length), Array(s1.length)];
  for (let i = 0; i <= s2.length; i++) {
    arr[1][0] = i;
    for (let j = 1; j <= s1.length; j++) {
      arr[1][j] =
        i === 0
          ? j
          : Math.min(
              arr[0][j] + 1,
              arr[1][j - 1] + 1,
              arr[0][j - 1] + (s1[j - 1] === s2[i - 1] ? 0 : 1)
            );
    }
    arr[1].forEach((n, i) => { arr[0][i] = n; })
  }
  return arr[1][s1.length];
};

/**
 * @description Returns a new array sorted by score, given by scoring function
 * @param f Scoring function, returns number <- [0 .. 1]
 * @param arr To be sorted
 * @returns New sorted array
 */
const scoreSort = (f, arr) => {
  return arr.map(x => [f(x), x])
            .sort(([m, _], [n, __]) => n - m)
            .map(([_, x]) => x)
}

/**
 * @description Ranks rooms based on how well they match an optimal room
 * @param {OptimalRoom} optimalRoom - the ideal room to match against. Contains building, room, and labels
 * @param {Object[]} rooms - the rooms to rank
 * @returns {{ room: Room, score: number }[]} - the ranked rooms, sorted by rank in descending order
 */
const rank = (optimalRoom, rooms) => {
  return scoreSort((x => score(optimalRoom, x)), rooms)
}

module.exports = { score, rank };

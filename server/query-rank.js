// for reference:
// type RoomQuery = { tokens?: string[], labels?: string[] }

const buildingAliases = require('./building-aliases');

/**
 * @description Scores a given room based on how well it matches the query.
 * @param {roomQuery} roomQuery - the ideal room to match against. Ma building, room, and labels
 * @param {Object} givenRoom - contains a superset of fields from roomQuery
 * @returns {number} - the "match" score of the given room. 0 is no match, 1 is a perfect match
 */
const score = (roomQuery, givenRoom) => {
  let buildingScore = 1;
  let roomScore = 1;
  if (roomQuery.tokens !== undefined) {
    // compute sum of maximum levenshtein scores matched against aliases for givenRoom's building
    // (normalized by number of tokens to keep below 1)
    buildingScore = roomQuery.tokens.reduce((total, tok) => {
      const tokenLevScores = buildingAliases[givenRoom.building].map((alias) => 
        levScore(tok, alias));
      return total + Math.max(...tokenLevScores);
    }, 0) / roomQuery.tokens.length;
    
    // compute maximum levenshtein score matched against givenRoom's room
    roomScore = Math.max(
      ...roomQuery.tokens.map((tok) => levScore(tok, givenRoom.room.toLowerCase()))
    );
  }
  // if givenRoom doesn't include all labels in roomQuery, score is 0
  return includesAll(roomQuery.labels, givenRoom.labels) 
    ? (buildingScore + roomScore)/2
    : 0
}

// Returns true if all queryLabels are in givenRoomLabels, false otherwise
const includesAll = (queryLabels, givenRoomLabels) => {
  for (let i = 0; i < queryLabels.length; i++){
    if (!givenRoomLabels.includes(queryLabels[i])) { return false; }
  }
  return true;
}

// Gets a score based on levenshtein distance
const levScore = (s1, s2) => {
  return 1 - (levenshtein(s1, s2)/Math.max(s1.length, s2.length));
}

/**
 * Levenshtein distance between two strings
 * @param s1 string 1
 * @param s2 string 2
 * @returns number
 */
const levenshtein = (s1, s2) => {
  if (s1.length === 0 && s2.length === 0) return 0;
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
 * @description Returns a new array sorted by score, given by scoring function,
 * and removing rooms with scores of 0
 * @param f Scoring function, returns number <- [0 .. 1]
 * @param arr To be sorted
 * @returns New sorted array
 */
const scoreSort = (f, arr) => {
  return arr.map(x => [f(x), x])
            .filter(([score, _]) => score > 0)
            .sort(([m, _], [n, __]) => n - m)
            .map(([_, x]) => x)
}

/**
 * @description Ranks rooms based on how well they match an room query
 * @param {roomQuery} roomQuery - the query to match against. Contains query tokens and labels
 * @param {Object[]} rooms - the rooms to rank
 * @returns {{ room: Room, score: number }[]} - the ranked rooms, sorted by rank in descending order
 */
const rank = (roomQuery, rooms) => {
  return scoreSort((x => score(roomQuery, x)), rooms)
}

module.exports = { score, rank };

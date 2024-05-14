/**
 * @module queryStringParser
 */

const NON_APLHA_NUM = /[^a-zA-Z0-9]/g;

//parseBuildingRoomString unused
/**
 * Parses a raw query string into a building and room
 * @param {string} rawQuery - the raw query string to parse
 * @returns {Object} - an object representing the building and room
 * @returns {string} [building] - the building code
 * @returns {string} [room] - the room code
 */
const parseBuildingRoomString = (rawQuery) => {
  const tokens = rawQuery.split(' ')

  let roomBuildingTokens = tokens.map(token => token.replace(NON_APLHA_NUM, ' ').trim())
  if (roomBuildingTokens.length === 1) roomBuildingTokens = roomBuildingTokens[0].split(' ')
  roomBuildingTokens = roomBuildingTokens.filter(token => token.length > 0);

  if (roomBuildingTokens.length > 1) {
    return {
      building: roomBuildingTokens[0],
      room: roomBuildingTokens.slice(1).join(' '),
    };
  }

  if (roomBuildingTokens.length === 0) return {};

  const [ code ] = roomBuildingTokens;
  const buildingIndex = code.search(/[0-9]/);

  if (buildingIndex === 0) return { room: code }
  if (buildingIndex === -1) return { building: code }

  return {
    building: code.slice(0, buildingIndex),
    room: code.slice(buildingIndex),
  };
}

/**
 * @description Parses a raw query string into an "ideal room" object
 * @param {string} rawQuery - the raw query string to parse
 * @returns {Object} an object representing the ideal room
 * @returns {string[]} [labels] - an array of labels
 * @returns {string} [building] - the building code
 * @returns {string} [room] - the room code
 * @example parseQueryString('woo 3040') // { building: 'woo', room: '3040' }
*/
const parseQueryString = (rawQuery) => {
  const query = rawQuery.trim()
  if (query.length === 0) return {};
  const tokens = query.split(' ')

  const labelTokenPrefix = 'label:';
  const labelTokens = tokens.filter(token => token.startsWith(labelTokenPrefix));
  const labels = labelTokens.map(token => token.slice(labelTokenPrefix.length));

  const tokenizedQuery = tokens.filter(token => !token.startsWith(labelTokenPrefix))
    .map(token => token.replace(NON_APLHA_NUM, '').toLowerCase()); // remove all non-alphanumeric characters and make lower case
    
  let roomQuery = {}
  roomQuery.labels = Array.from(new Set(labels));
  if (tokenizedQuery.length > 0) roomQuery.tokens = tokenizedQuery;

  return roomQuery;
}

module.exports = parseQueryString;
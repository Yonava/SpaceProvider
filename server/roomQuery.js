
const replaceNonAlphaNumWithSpace = (str) => str.replace(/[^a-zA-Z0-9]/g, ' ');

/**
 * Parses a raw query string into an "ideal room" object
 * @param {string} rawQuery - the raw query string to parse
 * @returns {Object} - an object representing the ideal room
*/
const parseQueryString = (rawQuery) => {
  const tokens = rawQuery
    .trim()
    .split(' ')

  // get the labels
  const labelTokenPrefix = 'label:';
  const labelTokens = tokens.filter(token => token.startsWith(labelTokenPrefix));
  const rawLabels = labelTokens.map(token => token.slice(labelTokenPrefix.length));
  const labels = Array.from(new Set(rawLabels));

  let roomBuildingTokens = tokens
    .filter(token => !token.startsWith(labelTokenPrefix))
    .map(token => replaceNonAlphaNumWithSpace(token).trim())
    .filter(token => token.length > 0)

  if (roomBuildingTokens.length === 1) {
    roomBuildingTokens = roomBuildingTokens[0].split(' ').filter(token => token.length > 0)
  }

  if (roomBuildingTokens.length > 1) {
    return {
      building: roomBuildingTokens[0],
      room: roomBuildingTokens.slice(1).join(' '),
      labels,
    };
  }

  if (roomBuildingTokens.length === 0) {
    return { labels };
  }

  const [ code ] = roomBuildingTokens;
  const buildingIndex = code.search(/[0-9]/);

  if (buildingIndex === 0) {
    return {
      room: code,
      labels,
    }
  }

  if (buildingIndex === -1) {
    return {
      building: code,
      labels,
    }
  }

  return {
    building: code.slice(0, buildingIndex),
    room: code.slice(buildingIndex),
    labels,
  };
}

module.exports = parseQueryString;
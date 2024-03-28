
// try adding something to mock data and see if you can access it from the /room endpoint!
const mock = {
  'LIB-350': {
    building: 'LIB',
    room: '350',
    access_notes: 'this room is only accessible through the hidden du bois tunnel',
    images: ['something.png', 'somethingelse.png', 'anotherthing.png'],
    gps_coords: {
      lat: 37.3352,
      long: -121.8811
    },
    labels: ['WHITE_BOARD', 'QUIET_AREA'],
    capacity: 50,
    last_edited: new Date().toISOString(),
  },
  // add a new room here
}

module.exports = mock
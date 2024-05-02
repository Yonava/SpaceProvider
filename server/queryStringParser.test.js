const p = require('./queryStringParser')

describe('parseBuildingRoomString', () => {
  test('handles single spaced room codes', () => {
    expect(p('woo 3040')).toEqual({ building: 'woo', room: '3040' })
    expect(p('lgrc 4949')).toEqual({ building: 'lgrc', room: '4949' })
  })

  test('handles misc delimiters', () => {
    expect(p('woo/;  *304')).toEqual({ building: 'woo', room: '304' })
    expect(p('woo-3040')).toEqual({ building: 'woo', room: '3040' })
    expect(p('woo--359')).toEqual({ building: 'woo', room: '359' })
  });

  test('condenses whitespace', () => {
    expect(p('  fr09')).toEqual({ building: 'fr', room: '09' })
    expect(p('lgrt - 459594')).toEqual({ building: 'lgrt', room: '459594' })
    expect(p('   hert/ 340        ')).toEqual({ building: 'hert', room: '340' })
    expect(p('ilc      6')).toEqual({ building: 'ilc', room: '6' })
  });

  test('handles no whitespace', () => {
    expect(p('fr09')).toEqual({ building: 'fr', room: '09' })
    expect(p('lgrt-459594')).toEqual({ building: 'lgrt', room: '459594' })
    expect(p('hert/340')).toEqual({ building: 'hert', room: '340' })
    expect(p('ilc6')).toEqual({ building: 'ilc', room: '6' })
  });

  test('handles no room', () => {
    expect(p(' fr ')).toEqual({ building: 'fr' })
    expect(p('lgrt- ')).toEqual({ building: 'lgrt' })
    expect(p('hert/')).toEqual({ building: 'hert' })
    expect(p(' ilc')).toEqual({ building: 'ilc' })
  });

  test('handles no building', () => {
    expect(p(' 09')).toEqual({ room: '09' })
    expect(p('-459594')).toEqual({ room: '459594' })
    expect(p('/340')).toEqual({ room: '340' })
    expect(p('6')).toEqual({ room: '6' })
  });

  test('handles no input', () => {
    expect(p('')).toEqual({})
    expect(p(' ')).toEqual({})
    expect(p(' / - : ')).toEqual({})
  });
})

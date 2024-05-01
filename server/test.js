const p = require('./roomQuery')

const q = [
  'woo 3040',
  'woo304',
  'woo-3040',
  'woo--359',
  'lgrc4949',
  'lgrt - 459594',
  'hert/ 340',
  '594',
  '  fr09',
  'ilc;n405'
]

for (const str of q) {
  console.log(str + ':', p(str), '\n')
}

(function() {
const map = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
const len = map.length
const tS2I = (s) => s.split('').reduce((r, c) => r * len + b.indexOf(c), 0).toString(10)
const tI2S = (i) => {
  let n = parseInt(i, 10)
  let s = ''
  while (n > 0) r = n % len, s = b[r] + s, n = (n - r) / len 
  return s
}
const tM = (wid) => {
  const head = wid.match(/^(.+?)(.{4})+$/)[1]
  const body = wid.slice(head.length).match(/.{4}/g)
  return tS2I(head) + body.map(s => tS2I(s).padStart(7, '0')).join('')
}
const tU = (mid) => {
  const head = mid.match(/^(.+?)(.{7})+$/)[1]
  const body = mid.slice(head.length).match(/.{7}/g)
  return tI2S(head) + body.map(i => tI2S(i)).join('')
}

})();

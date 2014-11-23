module.exports = function rgb () {
  var inverseCompand = function inverseCompand (companded) {
    return (companded <= 0.04045) ? (companded / 12.92) : Math.pow((companded + 0.055) / 1.055, 2.4)
  }
  var compand = function compand (linear) {
    return (linear <= 0.0031308) ? (linear * 12.92) : (1.055 * Math.pow(linear, 1.0 / 2.4) - 0.055)
  }

  return {
    name: 'rgb',
    to: { 'xyz': function (R, G, B) {
      var r = inverseCompand(R / 255)
      var g = inverseCompand(G / 255)
      var b = inverseCompand(B / 255)
      var X = r * 0.4124564 + g * 0.3575761 + b * 0.1804375
      var Y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750
      var Z = r * 0.0193339 + g * 0.1191920 + b * 0.9503041
      return [X, Y, Z]
    } },
    from: { 'xyz': function (X, Y, Z) {
      var R = compand(X *  3.2404542 + Y * -1.5371385 + Z * -0.4985314) * 255
      var G = compand(X * -0.9692660 + Y *  1.8760108 + Z * 0.0415560) * 255
      var B = compand(X *  0.0556434 + Y * -0.2040259 + Z * 1.0572252) * 255
      return [R, G, B]
    } }
  }
}

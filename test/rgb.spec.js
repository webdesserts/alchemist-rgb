var expect = require('chai').expect
var Alchemist = require('alchemist-js')
var rgb = require('../')

describe('rgb', function () {
  var alchemist, xyz, ref_white;

  before(function () {
    alchemist = Alchemist.create({ precision: 4, limits: 'nullify' })
    xyz = { name: 'xyz', to: {} }
    alchemist.use(rgb())
    alchemist.use(xyz)
    var white = alchemist.BaseSpace.white
    ref_white = [white.X, white.Y, white.Z]
  })

  describe('limits', function () {
    var clipper
    before(function () {
      clipper = Alchemist.create({ precision: 4, limits: 'clip' })
      clipper.use(rgb())
      clipper.use(xyz)
    })
    it('should clip anything over 255', function () {
      expect(clipper.rgb(361, 255.1, 256).value).to.deep.eq([255, 255, 255])
    })
    it('should clip anything under 0', function () {
      expect(clipper.rgb(-1, -255, -0.1).value).to.deep.eq([0, 0, 0])
    })
  })


  describe('to xyz', function () {
    it('should convert', function () {
      expect(alchemist.rgb(50, 150, 200).xyz()).to.deep.eq([.2264, .2666, .5858])
    })
    it('handles greys well', function () {
      expect(alchemist.rgb(150, 150, 150).xyz()).to.deep.eq([0.2899, 0.305, 0.3321])
    })
    it('handles black well', function () {
      expect(alchemist.rgb(0, 0, 0).xyz()).to.deep.eq([0, 0, 0])
    })
    it('handles white well', function () {
      expect(alchemist.rgb(255, 255, 255).xyz()).to.deep.eq([0.9505, 1, 1.089])
    })
  })

  describe('from xyz', function () {
    it('should convert', function () {
      expect(alchemist.xyz(.50, .50, .50).rgb()).to.deep.eq([203.8, 183.1, 179.6])
    })
    it('handles greys well', function () {
      expect(alchemist.xyz(.12113, .12744, .13876).rgb()).to.deep.eq([100, 100, 100])
    })
    it('handles black well', function () {
      expect(alchemist.xyz(0, 0, 0).rgb()).to.deep.eq([0, 0, 0])
    })
    it('handles white well', function () {
      expect(alchemist.xyz(ref_white).rgb()).to.deep.eq([255, 255, 255])
    })
  })
})

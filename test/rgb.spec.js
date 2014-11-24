var expect = require('chai').expect
var Alchemist = require('alchemist-js')
var rgb = require('../')

describe('rgb', function () {
  var alchemist

  before(function () {
    alchemist = Alchemist.create({ precision: 4 })
    alchemist.use(rgb())
    alchemist.use({ name: 'xyz', to: {} })
  })

  it('to xyz', function () {
    expect(alchemist.rgb([50, 150, 200]).xyz()).to.deep.eq([.2264, .2666, .5858])
  })

  it('from xyz', function () {
    expect(alchemist.xyz([.50, .50, .50]).rgb()).to.deep.eq([203.7839, 183.1073, 179.6471])
  })
})

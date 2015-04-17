var expect = require('chai').expect
  , tokenizer = require('../src')

describe('tokenizer', function() {
  it('should split phrase to tokens and returns object', function(done) {
    //given
    var input = '#aa test'

    //when
    var t =
      tokenizer()
        .input(input)
        .token('tag', /#(\w{2})\ /)
        .token('input', /.+/)
        .resolve()

    //then 
    expect(t.tag).to.equal('aa')
    expect(t.input).to.equal('test')
    expect(t._source).to.equal(input)

    done()
  }),

  it('should split phrase to multiple the same tokens and returns object', function(done) {
    //given
    var input = '#aa #bb #cc test'

    //when
    var t =
      tokenizer(input)
        .tokens({ tag: /#(\w{2})\ / , input: /.+/ })
        .resolve()

    //then 
    expect(t.tag.join('')).to.equal(['aa','bb','cc'].join(''))
    expect(t.input).to.equal('test')
    expect(t._source).to.equal(input)

    done()
  })
})

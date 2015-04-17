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

  it('should skip unwanted tag and treat is as rest of the query', function(done) {
    //given
    var input = '#aa #bb #cc test'
      , knownTags = ['aa', 'bb']

    //when
    var r = {}
      , t =
      tokenizer(input)
        .tokens({ tag: /#(\w{2})\ / })
        .tokens({ input: /.+/ })
        .walk(function(type, value, match) {
          if(type == 'tag' && knownTags.indexOf(value) == -1) return false
          r[type] = r[type] || []
          r[type].push(value)
        })

    //then 
    expect(r.tag.join('')).to.equal(['aa','bb'].join(''))
    expect(r.input.join('')).to.equal('#cc test')

    done()
  })

  describe('order, greediness and stuff of regexps', function() {
    it('should match with nearest regexp index', function(done) {
      //given
      var input = '#aa #bb foo foo baz'
        , knownTags = ['aa', 'bb']

      //when
      var r = {}
        , t =
        tokenizer(input)
          .tokens({ tag: /#(\w{2})\ / })
          .tokens({ foo: /\ ?(foo)/ })
          .tokens({ input: /\ ?(.+)/ })
          .walk(function(type, value, match) {
            r[type] = r[type] || []
            r[type].push(value)
          })

      //then 
      expect(r.tag.join('')).to.equal(['aa','bb'].join(''))
      expect(r.foo.length).to.equal(2)
      expect(r.input.join('')).to.equal('baz')

      done()
    })

    it('break after one was captured', function(done) {
      //given
      var input = '#aa #bb foo foo baz'
        , once = 'foo'
        , knownTags = ['aa', 'bb']

      //when
      var r = {}
        , t =
        tokenizer(input)
          .tokens({ tag: /#(\w{2})\ / })
          .tokens({ foo: /\ ?(foo)/ })
          .tokens({ input: /\ ?(.+)/ })
          .walk(function(type, value, match) {
            if(r[type] && r[once]) return false //caputure only one /foo/

            r[type] = r[type] || []
            r[type].push(value)
          })

      //then 
      expect(r.tag.join('')).to.equal(['aa','bb'].join(''))
      expect(r.foo.length).to.equal(1)
      expect(r.input.join('')).to.equal('foo baz')

      done()
    })
  })

})

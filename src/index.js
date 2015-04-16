var _ = {
  keys: require('lodash.keys')
, val: require('lodash.values')
, uniq: require('lodash.uniq')
, last: require('lodash.last')
, compact: require('lodash.compact')
}

module.exports = function(input) {
  var self = {}
    , _tokens = {}
    , _input = input

  self.input = function(input) {
    _input = input
    return self
  }

  self.token = addToken
  self.walk = walk
  self.resolve = resolve

  return self

  function addToken(name, expression) {
    var e = getSource(expression)
    // e = e.replace(/\//, '\\\/').replace('^\/|\/.*$', '')

    expression = new RegExp('(' + e + ')')

    _tokens[ expression.source ] = name

    return self

    function getSource(expression) {
      var isRegExp = Object.prototype.toString.call(expression) == '[object RegExp]'
      if(isRegExp) return expression.source
      return getSource(new RegExp(expression))
    }
  }

  function walk(onToken) {
    var cb = onToken || noop

    var tokens = _.keys(_tokens)
      , names = _.val(_tokens)
      , __tokens
      , __names

    var skip = function(skip) {
      console.log('skipping step', skip)

      __tokens = __tokens || tokens
      __names = __names || names

      __tokens.splice(skip, 1)
      __names.splice(skip, 1)

      run(__tokens, __names)
    }

    run(tokens, names)

    return self

    function run(tokens, names) {
      var match
        , step = 0
        , expression = evaluateExpression(tokens)

      while (match = getMatch(expression, _input)) {
        var shouldSkip = cb(names[step], topMatch(match), _.uniq(_.compact(match)))
        //multimatch a few tags
        if(typeof shouldSkip != 'undefined' && !shouldSkip) return skip(step)

        step++
      }

      function getMatch(expression, input) {
        var match = expression.exec(input)
          , found = match && match.length > 1

        if (!match) return null
        if (!found) return null

        return match
      }

      function topMatch(arr) { return _.last(_.compact(arr)) }

      function evaluateExpression(tokens) { return new RegExp(tokens.join('|'), 'g') }
    }
  }

  function resolve() {
    var r = { _source: _input }
    walk(function(name, value, raw) { r[name] = value })
    return r
  }

  function noop() { }
}

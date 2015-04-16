var _ = {
  keys: require('lodash.keys')
, values: require('lodash.values')
, uniq: require('lodash.uniq')
, last: require('lodash.last')
, compact: require('lodash.compact')
, isEmpty: require('lodash.isempty')
}

module.exports = function(input) {
  var self = {}
    , _tokens = {}
    , _input = input

  self.input = function(input) {
    _input = input
    return self
  }

  self.tokens = self.token = addToken
  self.walk = walk
  self.resolve = resolve

  return self

  function addToken(token) {
    var names = _.keys(token)
      , expressions = _.values(token)
      , expression

    expressions.forEach(function(d, i) {
      expression = new RegExp('(' + getSource(d) + ')')
      _tokens[ expression.source ] = names[i]
    })

    return self

    function getSource(expression) {
      if(is(expression, 'RegExp')) return expression.source
      return getSource(new RegExp(expression))
    }
  }

  function walk(onToken) {
    var cb = onToken || noop

    var tokens = _.keys(_tokens) || []
      , names = _.values(_tokens)

    if(tokens.length == 0) throw new Error('Define at least one token')

    runFrom(0)

    return self

    function runFrom(lastIndex) {
      var e

      for(var i = 0; i < tokens.length; i++) {
        e = new RegExp(tokens[i], 'g')
        e.lastIndex = lastIndex

        var part
          , idx = !_.isEmpty(part = e.exec(_input)) ? part.lastIndex || part.index : -1
          , match

        if(idx == lastIndex) {

          match = part || []

          var shouldSkip = cb(names[i], topMatch(match), _.uniq(_.compact(match)))
          if(typeof shouldSkip != 'undefined' && !shouldSkip) continue

          idx += match[0].length

          return runFrom(idx)
        }
      }
    }

    function topMatch(arr) { return _.last(_.compact(arr)) }
    function evaluateExpression(tokens) { return new RegExp(tokens.join('|'), 'g') }
  }

  function resolve() {
    var r = { }
    walk(function(name, value, raw) { 
      if(is(r[name], 'Array')) return r[name].push(value)
      if(is(r[name], 'String')) return r[name] = ([value]).concat(r[name] || []).reverse()

      r[name] = value 
    })
    r._source = _input
    return r
  }

  function noop() { }
  function is(expression, type) { return Object.prototype.toString.call(expression) == '[object ' + type + ']' }
}

var _ = {
  keys: require('lodash.keys')
, values: require('lodash.values')
, uniq: require('lodash.uniq')
, last: require('lodash.last')
, compact: require('lodash.compact')
, isEmpty: require('lodash.isempty')
, assign: require('lodash.assign')
}

module.exports = function(input) {
  var self = {}
    , _tokens = {}
    , _helpers = {}
    , _input = input

  self.input = function(input) {
    _input = input
    return self
  }

  self.token = function(token, pattern, helper) {
    var t = {}
    t[token] = pattern
    addTokens(t)
    helper && self.helper(token, helper)
    return self
  }

  self.helper = function(token, callback) {
    var m = {}
    m[token] = callback
    addHelpers(m)
    return self
  }

  self.tokens = addTokens
  self.helpers = addHelpers

  self.walk = walk
  self.resolve = resolve

  return self

  function addTokens(token) {
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

  function addHelpers(helpers) {
    for(var helper in helpers) _helpers[ helper ] = helpers[ helper ]
    return self
  }

  function walk(onToken) {
    var cb = onToken || noop

    var tokens = _.keys(_tokens) || []
      , names = _.values(_tokens)

    if(tokens.length == 0) throw new Error('Define at least one token')

    runFrom(0)

    return self

    function runFrom(lastIndex) {
      var expr
        , helper

      for(var i = 0; i < tokens.length; i++) {
        expr = new RegExp(tokens[i], 'g')
        expr.lastIndex = lastIndex

        helper = _helpers[names[i]]

        var part
          , offset = !_.isEmpty(part = evalExpr()) ? part.lastIndex || part.index : -1
          , matches

        function evalExpr() {
          var r = expr.exec(_input)
          if(helper && r) r.push(helper(r, _input, expr.source))
          return r
        }

        if(offset == lastIndex) {

          match = part || []

          var shouldSkip = cb(names[i], topMatch(match), _.uniq(_.compact(match)))
          if(typeof shouldSkip != 'undefined' && !shouldSkip) continue

          offset += match[0].length

          return runFrom(offset)
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
      if(is(r[name], 'Object')) return r[name] = _.assign(value, r[name])

      r[name] = r[name] || []
      r[name].push(value)
    })

    r._source = _input

    return simplify(r)

    function simplify(r) {
      for(var key in r)
        if(is(r[key], 'Array') && r[key].length == 1) 
          r[key] = r[key][0]

      return r
    }
  }

  function noop() { }
  function is(expression, type) { return Object.prototype.toString.call(expression) == '[object ' + type + ']' }
}

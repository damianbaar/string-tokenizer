var _ = {
  keys: require('object-keys')
, values: require('object-values')
, assign: require('object-assign')
, uniq: require('uniq')
, last: require('array-last')
, compact: function(d) { return d.filter(function(d) { return d }) }
}

module.exports = function(input) {
  var self = {}
    , _tokens = {}
    , _helpers = {}
    , _input = input
    , _debug = false

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

  self.debug = function() { return _debug = true, self }

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
          , offset = (part = evalExpr()) && part.length > 0 ? part.lastIndex || part.index : -1
          , matches

        function evalExpr() {
          var r = expr.exec(_input)
          if(helper && r) r.push(helper(r, _input, expr.source))
          debug('tag %s, index %s, exec %s', names[i], lastIndex, r)
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
  function debug() { if(_debug) console.log.apply(console, arguments) }
}

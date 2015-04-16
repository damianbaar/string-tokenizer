var tokenizer = require('../src')

  tokenizer()
    .input('#aa test')
    .token('tag', /#(\w{2})\ /)
    .token('input', /.+/)
    .walk(function(token, value, match) {
      console.log('Tokens', token, value, match)
    })

  //SKIP token when value is different than expected value
  //there is a match but i.e. expected business logic do not recognize such value
  tokenizer()
    .input('#aa #bb #cc test')
    .token('tag', /#(\w{2})\ /)
    .token('input', /.+/)
    .walk(function(token, value, match) {
      // if(token == 'tag' && ['aa','bb'].indexOf(value) > -1) return false

      console.log('Tokens', token, value, match)
    })

  //Resolve to object { tokenName: tokenValue }
var result = tokenizer()
    .input('#aa test')
    .token('tag', /#(\w{2})\ /)
    .token('input', /.+/)
    .resolve()

  console.log('resolved', result)

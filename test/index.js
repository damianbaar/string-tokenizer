var tokenizer = require('../src')
  
print('One match for token')

  tokenizer()
    .input('#aa test')
    .token({ tag: /#(\w{2})\ / })
    .token({ input: /.+/ })
    .walk(function(type, value, match) {
      console.log(type, value, match)
    })

print('From Object and strings')

  tokenizer()
    .input('#aa test')
    .tokens({tag: '#(\\w{2})\\ ', input: '.+'})
    .walk(function(type, value, match) {
      console.log(type, value, match)
    })

print('Many matches for same token')

  tokenizer()
    .input('#aa #bb #cc test')
    .token({ tag: /#(\w{2})\ / })
    .token({ input: /.+/ })
    .walk(function(type, value, match) {
      console.log(type, value, match)
    })


print('Skip token when additional conditions needs to be aplied')

var knownTags = ['aa','bb']

  tokenizer()
    .input('#aa #bb #cc test')
    .token({ tag: /#(\w{2})\ / })
    .token({ input: /.+/ })
    .walk(function(type, value, match) {
      if(type == 'tag' && knownTags.indexOf(value) == -1) return false

      console.log(type, value, match)
    })

print('Resolving to Object')

var result = tokenizer()
    .input('#aa #bb #cc test')
    .token({ tag: /#(\w{2})\ / })
    .token({ input: /.+/ })
    .resolve()

  console.log(result)

////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////

  function print() {
    console.log('----------------')
    console.log.apply(console, arguments)
    console.log('----------------')
  }




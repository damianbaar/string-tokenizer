## `string-tokenizer`

Simple string tokenizer to easly define some set of rules for particular phrase in `node` and `browser` without headache.

### Usage

* install in `node`/`common-js-browser-bundler` env
`npm install --save string-tokenizer`

```
var tokenizer = require('string-tokenizer')
```

* In browser 

```html 
<script src="./string-tokenizer/dist/string-tokenizer.js"></script>
```

```
  var tokenizer = db.tokenizer //as a global
                               //wrapped by UMD, available via AMD as string-tokenizer
  var tokens = 
    tokenizer()
      .input('#aa test')
      .token('tag', /#(\w{2})\ /)
      .token('input', /.+/)
      .resolve()
  
  //result { tag: 'aa', input: 'test' }
```

### API

* basic functionallity

```
    //Defining INPUT
    tokenizer(input?)                       //instance
      .input('#aa tes)                      //input

    //Making DEFINITIONs
      .token('tag', /#(\w{2})\ /, helper?)    //define pattern as 'tag' with optional helper method
      .token('input', /.+/)                   //define pattern as 'input'
      .token('name', string or RegExp)

    //Invocation MODEs
    .walk(function(type, value, match) { })   //manual mode, invoked on each token
    //or
    .resolve()                                //auto mode, exporting tokens to object

    //Debugging
    .debug()                                  //...
```

* skipping unwanted phrase during `walk`

TODO

* defining and using `helpers`

TODO

### Examples

`npm run example` or open `example.html` file to play with it in console.

var includeExternal = require('re-define-include-external')

module.exports = function(grunt) {

  grunt.registerTask('test', ['mochaTest'])
  grunt.registerTask('build', ['redefine:tokenizer:production'])
  grunt.registerTask('dev', ['build', 'watch'])

  grunt.initConfig({
    redefine: {
      "tokenizer": {
          base: '/src'
        , wrapper: 'umd'
        , names: { amd:"tokenizer", global:"db.tokenizer"}
        , builds: {
          development: {
            showWarnings: true
          , development: true
          },
          production: {
            development: false
          , showWarnings: false
          }
        }
        , transforms: [ includeExternal({ }) ]
        , src: ['./src/index.js']
        , dest: './dist/tokenizer.js'
      }
    },

    mochaTest: {
      test: {
        options: { reporter: 'spec' },
        src: ['test/**/*.js']
      }
    },

    watch: {
      scripts: {
        files: ['./src/*.js', './test/*.test.js', './example.js'],
        tasks: ['redefine:tokenizer:development', 'mochaTest'],
        options: {
          spawn: true
        }
      }
    }
  })

  grunt.loadNpmTasks('grunt-re-define')
  grunt.loadNpmTasks('grunt-mocha-test')
  grunt.loadNpmTasks('grunt-contrib-watch')
}

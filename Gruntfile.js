var includeExternal = require('re-define-include-external')

module.exports = function(grunt) {

  grunt.registerTask('teset', ['demo'])
  grunt.registerTask('build', ['redefine:tokenizer:production', 'watch'])
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
          , dest: './dist/tokenizer.js'
          },
          production: {
            development: false
          , showWarnings: false
          , dest: './examples/first/out.production.js'
          }
        }
        , transforms: [ includeExternal({ }) ]
        , src: ['./src/index.js']
      }

    },

    watch: {
      scripts: {
        files: ['./lib/**/*.js']
        tasks: ['redefine:tokenizer:development'],
        options: {
          spawn: false
        }
      }
    }
  })

  grunt.loadTasks('tasks')
  grunt.loadNpmTasks('grunt-contrib-watch')
}

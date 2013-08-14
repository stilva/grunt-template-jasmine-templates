/*global module:false, define:false*/
module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        jshintrc: ".jshintrc"
      }
    },

    watch: {
      scripts: {
        files: ['src/**/*.js', 'test/**/*Spec.js'],
        tasks: ['jshint', 'test']
      }
    },

    connect: {
      test: {
        port: 8000,
        base: '.'
      }
    },

    jasmine: {
      handlebars: {
        src: 'test/src/**/*s.js',
        options: {
          keepRunner: true,
          specs: 'test/spec/**/*Spec.js',

          host: 'http://127.0.0.1:<%= connect.test.port %>/',

          template: require('./'),

          templateOptions: {
            vendor: 'vendor/**/*.js',
            template: 'test/spec/templates/**/*.tmpl'
          }
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('test', ['connect', 'jasmine:handlebars']);

  // Default task.
  grunt.registerTask('default', ['watch']);

};
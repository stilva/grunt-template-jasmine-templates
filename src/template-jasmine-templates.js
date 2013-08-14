"use strict";

exports.process = function(grunt, task, context) {

  // node libraries
  var fs = require('fs'),
      path = require('path');

  var templates = __dirname + "/templates/DefaultRunner.tmpl",
      specs = grunt.option("spec"),
      vendor = context.options.vendor,
      tmpl = context.options.template;

  // Remove glob patterns from scripts (see https://github.com/gruntjs/grunt-contrib-jasmine/issues/42)
  filterGlobPatterns(context.scripts);

  // Should the vendor path be provided
  if(vendor) {
    context.scripts.vendor = getRelativeFileList("", vendor);
  }

  // Let's just make sure we have templates
  if(tmpl) {
    context.templates = getFileList(tmpl).map(function(element, index) {
      return {uid:path.basename(element, ".tmpl")+"_tmpl", content:fs.readFileSync(path.resolve(element)).toString()};
    });
  }

  var source = grunt.file.read(templates);
  return grunt.util._.template(source, context);

  /**
   * Get all the files from a file list with a glob patterns
   * @param patterns String || Array containing path to file. Can include *
   * @param options Object
   * @returns {Array}
   */
  function getFileList(patterns, options) {
    var files = [];
    patterns = patterns instanceof Array ? patterns : [ patterns ];
    options = options || {};
    patterns.forEach(function(listItem){
      if (listItem) files = files.concat(grunt.file.expand(options, listItem));
    });
    return files || [];
  }

  // from grunt-template-jasmine-requirejs
  function getRelativeFileList(outdir, patterns, options) {
    var files = getFileList(patterns, options);

    files = grunt.util._(files).map(function(file){
      return (/^https?:/).test(file) ? file : path.relative(outdir, file).replace(/\\/g, '/');
    });
    return files;
  };
};

// from https://github.com/jsoverson/grunt-template-jasmine-requirejs/blob/master/src/template-jasmine-requirejs.js
function filterGlobPatterns(scripts) {
  Object.keys(scripts).forEach(function (group) {
    if (Array.isArray(scripts[group])) {
      scripts[group] = scripts[group].filter(function(script) {
        return script.indexOf('*') === -1;
      });
    } else {
      scripts[group] = [];
    }
  });
}
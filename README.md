Handlebars/Underscore template for Jasmine unit tests
-----------------------------------------------------
[![Build Status](https://travis-ci.org/stilva/grunt-template-jasmine-templates.png)](https://travis-ci.org/stilva/grunt-template-jasmine-templates)

Allows for javascript template engines to be used within jasmine

## Installation

```
npm install grunt-template-jasmine-templates --save-dev
```

## Template Options

### templateOptions.vendor
Type: `String` or `Array`
Options: path to, or globbing patterns
Default: none

The vendor to use. Handlebarjs and Underscore are both pre-saved in the vendor folder

## Sample usage

```js
// Example configuration using a single requireJS config file
grunt.initConfig({
  jasmine: {
    templates: {
      src: 'src/**/*.js',
      options: {
        specs: 'spec/*Spec.js',
        host: 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-templates'),
        templateOptions: {
          vendor: 'vendor/**/*.js',
          template: 'src/**/*.tmpl'
        }
      }
    }
  }
});
```

Note that you would need [grunt-contrib-connect](https://github.com/gruntjs/grunt-contrib-connect)

Your *Spec file could look something like this:
```js
describe("Handlebars templating", function() {

  // If you're trying to use a template named handlebars.tmpl,
  // it will be accessible via its id handlebars_tmpl
  var template = document.getElementById("handlebars_tmpl").innerHTML;

  it("has access to the template", function(){
    var compiledTemplate = Handlebars.compile(template);

    // Let's create some nodes from the template
    var el = document.createElement("div");
    el.innerHTML = compiledTemplate;
    el = el.children[0];

    // Let's now test these nodes
    expect(el.id).toBe("container_"+uid);
    expect(el.children[0].textContent).toBe("unique_"+uid);
  });

});
```
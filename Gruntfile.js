/*global module:false*/
module.exports = function(grunt) {
  var files = {
    app: [
      'src/view.js',
      'src/todos.js'
    ],
    vendor: [
      'vendor/jquery.min.js',
      'vendor/jasmine-jquery-1.3.1.js',
      'vendor/lodash.min.js',
      'vendor/backbone.js',
      'vendor/sinon-1.6.0.js',
      'vendor/rosie.js',
      'vendor/faker.js'
    ]
  };

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',
    lint: {
      files: files.app
    },
    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },
    jasmine: {
      test: {
        src: files.app,
        options: {
          vendor: files.vendor,
          specs: ['spec/**/*_spec.js'],
          helpers: [
            'spec/factories/*_factory.js',
            'spec/helpers/**/*.js'
          ]
        }
      }
    },
    open: {
      file: {
        path: '_SpecRunner.html'
      },
      url: {
        path: 'http://127.0.0.1:8000/_SpecRunner.html'
      },
      presentation: {
        path: 'deck/boilerplate.html'
      }
    },
    watch: {
      files: files.app,
      tasks: 'lint jasmine'
    },
    jshint: {
      options: {
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true,

        expr: true,
        curly: false
      },
      globals: {
        Backbone: true,
        _: true,
        $: true,
        JST: true,
        $script: true,
        Lawnchair: true,
        sinon: true,
        cookie: true,
        console: true
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'jshint');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // jasmine task no longer has server helper, so we have to cobble together a solution
  // with connect and wait. when running in a browser we need to run tests from a URL so Ajax works.
  grunt.registerTask('wait', 'Wait for a set amount of time.', function(delay) {
    var d = delay ? delay + ' second' + (delay === '1' ? '' : 's') : 'forever';
    grunt.log.write('Waiting ' + d + '...');
    // Make this task asynchronous. Grunt will not continue processing
    // subsequent tasks until done() is called.
    var done = this.async();
    // If a delay was specified, call done() after that many seconds.
    if (delay) { setTimeout(done, delay * 1000); }
  });

  // grunt.renameTask('jasmine', 'jasmine-headless'); // requires PhantomJS
  grunt.registerTask('jasmine-browser', [ 'jasmine:test:build', 'connect', 'open:url', 'wait:10' ]);
  grunt.registerTask('present', [ 'jasmine:test:build', 'open:presentation', 'connect:server:keepalive' ]);
}

'use strict';
module.exports = function(grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  var jsFileList = [
      "assets/vendor/materialize/js/jquery.easing.1.3.js",
      "assets/vendor/materialize/js/velocity.min.js",
      "assets/vendor/materialize/js/hammer.min.js",
      "assets/vendor/materialize/js/jquery.hammer.js",
      "assets/vendor/materialize/js/collapsible.js",
      "assets/vendor/materialize/js/dropdown.js",
      "assets/vendor/materialize/js/leanModal.js",
      "assets/vendor/materialize/js/materialbox.js",
      "assets/vendor/materialize/js/parallax.js",
      "assets/vendor/materialize/js/tabs.js",
      "assets/vendor/materialize/js/tooltip.js",
      "assets/vendor/materialize/js/waves.js",
      "assets/vendor/materialize/js/toasts.js",
      "assets/vendor/materialize/js/sideNav.js",
      "assets/vendor/materialize/js/scrollspy.js",
      "assets/vendor/materialize/js/forms.js",
      "assets/vendor/materialize/js/date_picker/picker.js",
      "assets/vendor/materialize/js/date_picker/picker.date.js",
    'assets/js/plugins/*.js',
    'assets/js/_*.js'
  ];

  grunt.initConfig({
    copy: {
      dist: { cwd: 'assets/vendor/materialize/font', src: [ '**' ], dest: 'assets/font', expand: true },
    },
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/scripts.js',
        '!assets/**/*.min.*'
      ]
    },
    sass: {
      dev: {
        files: {
          'assets/css/main.css': [
            'assets/scss/main.scss'
          ]
        },
        options: {
          style: 'expanded',
          sourcemap: 'none'
        }
      },
      build: {
        files: {
          'assets/css/main.min.css': [
            'assets/scss/main.scss'
          ]
        },
        options: {
           style: 'compress',
          sourcemap: 'none'
        }
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: [jsFileList],
        dest: 'assets/js/scripts.js',
      },
    },
    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [jsFileList]
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9', 'android 2.3', 'android 4', 'opera 12']
      },
      dev: {
        options: {
          map: {
            prev: 'assets/css/'
          }
        },
        src: 'assets/css/main.css'
      },
      build: {
        src: 'assets/css/main.min.css'
      }
    },
    modernizr: {
      build: {
        devFile: 'assets/vendor/modernizr/modernizr.js',
        outputFile: 'assets/js/vendor/modernizr.min.js',
        files: {
          'src': [
            ['assets/js/scripts.min.js'],
            ['assets/css/main.min.css']
          ]
        },
        extra: {
          shiv: false
        },
        uglify: true,
        parseFiles: true
      }
    },
    version: {
      default: {
        options: {
          format: true,
          length: 32,
          manifest: 'assets/manifest.json',
          querystring: {
            style: 'roots_css',
            script: 'roots_js'
          }
        },
        files: {
          'lib/scripts.php': 'assets/{css,js}/{main,scripts}.min.{css,js}'
        }
      }
    },
    watch: {
      sass: {
        files: [
          'assets/scss/*.scss',
          'assets/scss/**/*.scss'
        ],
        tasks: ['sass:dev', 'autoprefixer:dev']
      },
      js: {
        files: [
          jsFileList,
          '<%= jshint.all %>'
        ],
        tasks: ['jshint', 'concat']
      },
      livereload: {
        // Browser live reloading
        // https://github.com/gruntjs/grunt-contrib-watch#live-reloading
        options: {
          livereload: false
        },
        files: [
          'assets/css/main.css',
          'assets/js/scripts.js',
          'templates/*.php',
          '*.php'
        ]
      }
    }
  });

  // Register tasks
  grunt.registerTask('default', [
    'dev'
  ]);
  grunt.registerTask('dev', [
    'copy',
    'jshint',
    'sass:dev',
    'autoprefixer:dev',
    'concat'
  ]);
  grunt.registerTask('build', [
    'copy',
    'jshint',
    'sass:build',
    'autoprefixer:build',
    'uglify',
    'modernizr',
    'version'
  ]);
};

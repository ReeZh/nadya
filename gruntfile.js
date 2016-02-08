'use_strict';
module.exports = function(grunt) {

  // Load NPM's via matchdep
//  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
          prod: '.test',
          dist: 'dist'
        },

      // check our JS
      jshint: {
        options: {
          "bitwise": true,
          "browser": true,
          "curly": true,
          "eqeqeq": true,
          "eqnull": true,
          "esnext": true,
          "immed": true,
          "jquery": true,
          "latedef": true,
          "newcap": true,
          "noarg": true,
          "node": true,
          "strict": false,
          "trailing": true,
          "undef": true,
          "globals": {
            "jQuery": true,
            "alert": true
          }
        },
        all: [
          'gruntfile.js',
          'javascripts/main.js',
          'javascripts/plugins.js',
        ]
      },

      // UGLIFY Process
      uglify: {

        // concat and minify our JS
        options: {
          beauty: true,
          mangle: {
            except: ['jQuery', 'Backbone']
          }
        },

        prod: {
          files: {
            '<%= config.prod %>/js/jquery.min.js': ['javascripts/libs/jquery.js'],
            '<%= config.prod %>/js/vendor.min.js': [
              'javascripts/libs/bootstrap.js',
              'javascripts/libs/jquery.flexslider.js',
              'javascripts/libs/owl.carousel.js'
            ],
            '<%= config.prod %>/js/main.min.js': ['javascripts/main.js']
          }
        },

        dist: {
          files: {
            '<%= config.dist %>/js/vendor.min.js': [
              'javascripts/libs/bootstrap.js',
              'javascripts/libs/jquery.flexslider.js',
              'javascripts/libs/owl.carousel.js'
            ],
            '<%= config.dist %>/js/main.min.js': ['javascripts/main.js']
          }
        },

      },

      connect: {
        options: {
          port: 9000,
          // livereload: 35729,
          // Change this to '0.0.0.0' to access the server from outside
          hostname: 'localhost',
          open: true,
        },

        livereload: {
          options: {
            port: 9000,
            base: '.'
          }
        },

        production: {
          options: {
            port: 9001,
            base: '<%= config.prod %>'
          }
        },

        distribution: {
          options: {
            port: 9002,
            base: '<%= config.dist %>'
          }
        },

      },

      watch: {

        scripts: {
          files: ['gruntfile.js','javascripts/**/*.js','stylesheets/**/*.scss'],
          tasks: ['jshint','uglify','sass','cssmin'],
          options: {
            livereload: true,
            spawn: false,
          },
        },

        html: {
          files: ['*.html','**/*.html'],
          task: ['htmlmin:prod'],
          options: {
            livereload: true,
            spawn: false,
          },
        }

      },

      htmlmin: {                                     // Task

        prod: {                                      // Target
          options: {                                 // Target options
            removeComments: true,
            collapseWhitespace: true
          },
          files: {                                   // Dictionary of files
            '<%= config.prod %>/*.html': '*.html',     // 'destination': 'source'
          }
        },

        dist: {                                       // Another target
          files: {
            '<%= config.dist %>/*.html': '*.html',
          }
        }
      },

      // SASS Process
      sass: {
        prod: {
          files: [{
            expand: true,
            cwd: 'stylesheets',
            src: ['*.scss'],
            dest: '<%= config.prod %>/css',
            ext: '.css'
          }]
        },
        dist: {
          files: [{
            expand: true,
            cwd: 'stylesheets',
            src: ['*.scss'],
            dest: '<%= config.dist %>/css',
            ext: '.css'
          }]
        },
      },

      // CSSMIN Process
      cssmin: {
        prod: {
          expand: true,
          cwd: '<%= config.prod %>/css/',
          src: ['*.css', '!*.min.css'],
          dest: '<%= config.prod %>/css/',
          ext: '.min.css'
        },
        dist: {
          expand: true,
          cwd: '<%= config.dist %>/css/',
          src: ['*.css', '!*.min.css'],
          dest: '<%= config.dist %>/css/',
          ext: '.min.css'
        },
      },

      // IMAGEMIN Process
      imagemin: {
        production: {
          files: [{
            expand: true,
            cwd: 'images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.prod %>/images'
          }]
        },
        distribution: {
          files: [{
            expand: true,
            cwd: 'images',
            src: '{,*/}*.{gif,jpeg,jpg,png}',
            dest: '<%= config.dist %>/images'
          }]
        },
      },

      // SVGMIN Process
      svgmin:  {
        production: {
          files: [{
            expand: true,
            cwd: 'images',
            src: '{,*/}*.svg',
            dest: '<%= config.prod %>/images'
          }]
        },
        distribution: {
          files: [{
            expand: true,
            cwd: 'images',
            src: '{,*/}*.svg',
            dest: '<%= config.dist %>/images'
          }]
        },
      },


      // Clean Process
      clean: {
        prod: {
          src: ['<%= config.prod %>'],
          options: {
            force: true
          }
        },
        dist: {
          src: ['<%= config.dist %>'],
          options: {
            force: true
          }
        },
      },

      copy: {
        prod: {
          files: [{
            expand: true,
            cwd: './',
            src: ['index.html','404.html','fonts/*','images/*'],
            dest: '<%= config.prod %>/'
          }]
        }
      },

      copyto: {
        dist: {
          files: [
            {cwd: '../', src: ['**/*'], dest: '../_dist/'}
          ],
          options: {
            ignore: [
              '../_dist{,/**/*}',
              '../doc{,/**/*}',
              '../grunt{,/**/*}',
              '../scss{,/**/*}'
            ]
          }
        }
      },

      bowercopy: {

        options: {
          // Bower components folder will be removed afterwards
          clean: false
        },

        default: {
          options: {
            clean: false,
            destPrefix: './'
          },
          files: {
            // SCSS
            'stylesheets': 'bootstrap-sass/assets/stylesheets',
            'stylesheets/_flexslider.scss': 'flexslider/flexslider.css',
            'stylesheets/_fontawesome.scss': 'font-awesome/css/font-awesome.css',
            'stylesheets/owlcarousel/_mixins.scss': 'owl.carousel/src/scss/_mixins.scss',
            'stylesheets/owlcarousel/_theme.scss': 'owl.carousel/src/scss/_theme.scss',
            'stylesheets/owlcarousel/_owl.animate.scss': 'owl.carousel/src/scss/owl.animate.scss',
            'stylesheets/owlcarousel/_owl.autoheight.scss': 'owl.carousel/src/scss/owl.autoheight.scss',
            'stylesheets/owlcarousel/_owl.carousel.scss': 'owl.carousel/src/scss/owl.carousel.scss',
            'stylesheets/owlcarousel/_owl.lazyload.scss': 'owl.carousel/src/scss/owl.lazyload.scss',
            'stylesheets/owlcarousel/_owl.theme.default.scss': 'owl.carousel/src/scss/owl.theme.default.scss',
            'stylesheets/owlcarousel/_owl.theme.green.scss': 'owl.carousel/src/scss/owl.theme.green.scss',
            'stylesheets/owlcarousel/_owl.video.scss': 'owl.carousel/src/scss/owl.video.scss',

            // IMAGES
            'images': 'flexslider/images',
            'images/ajax-loader.gif': 'owl.carousel/dist/assets/ajax-loader.gif',
            'images/owl.video.play.png': 'owl.carousel/dist/assets/owl.video.play.png',

            // FONTS
            'fonts': [
              'bootstrap-sass/assets/fonts/bootstrap',
              'font-awesome/fonts',
              'flexslider/fonts'
            ],
            // JS
            'javascripts/libs/jquery.js': 'jquery/dist/jquery.js',
            'javascripts/libs': 'bootstrap-sass/assets/javascripts',
            'javascripts/libs/jquery.flexslider.js': 'flexslider/jquery.flexslider.js',
            'javascripts/libs/owl.carousel.js': 'owl.carousel/dist/owl.carousel.js'
          },
        },

      },

    });

// Load the plugin
    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['copy:prod','connect:production', 'jshint','uglify:prod','sass:prod','cssmin:prod','watch']);

  // Default task
/*
  grunt.registerTask('default', function () {
    grunt.task.run([
      'connect:production',
      'jshint:prod',
      'uglify:prod',
      'sass:prod',
      'cssmin:prod',
      'watch'
    ]);
  });
*/

  grunt.registerTask('getsource', function() {
    grunt.task.run([
      'bowercopy',
    ]);
  });

  // Production task
  grunt.registerTask('production', function () {
    grunt.task.run([
      'connect:production',
      'jshint:prod',
      'uglify:prod',
      'sass:prod',
      'cssmin:prod',
      'watch'
    ]);
  });

  // Distribution task
  grunt.registerTask('distribution', function () {
    grunt.task.run([
      'jshint',
      'uglify',
      'sass:dist',
      'cssmin:dist',
      'clean:dist',
      'copyto:dist',
      'notify:dist'
    ]);
  });


};

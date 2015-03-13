'use_strict';
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        config: {
            app: 'app'
        },

        // chech our JS
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
                'Gruntfile.js',
                'src/javascripts/main.js'
            ]
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // Change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost',
                base: {
                    path: 'www-root',
                    options: {
                        index: 'index.html',
                        maxAge: 300000
                    }
                }
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '/index.html'
                    ]
                }
            },
        },      

        watch: {
            options: {
                livereload: true,
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '{,*/}*.html',
                    'css/{,*/}*.css',
                    'js/{,*/}*.js',
                    'images/{,*/}*'
                ]
            },
            compass: {
                files: ['**/*.{scss,sass}'],
                tasks: ['compass:dev'],
                options: {
                    lifereload: true
                }
            },
            js: {
                files: [
                    '<%= jshint.all %>'
                ],
                tasks: [
                    'jshint',
                    'uglify'
                ],
                options: {
                    livereload: true
                }
            }
        },

        uglify: {
            options: {
                beauty: true,
                mangle: {
                    except: ['jQuery', 'Backbone']
                }
            },
            js: {
                files: {
                    'js/main.min.js': ['src/javascripts/main.js']
                }
            },
        },

        compass: {
            clean: {
                options: {
                    clean: true
                }
            },
            dev: {
                options: {
                    noLineComments: true,
                    sassDir: ['src/stylesheets'],
                    cssDir: ['css'],
                    environment: 'development',
                    outputStyle: 'expanded'
                }
            },
            prod: {
                options: {
                    force: true,
                    noLineComments: true,
                    sassDir: ['src/stylesheets'],
                    cssDir: ['css'],
                    environment: 'production',
                    outputStyle: 'compressed'
                }
            },
        },

    });

    // Load the plugin
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Default task(s).
    grunt.registerTask('default', ['connect:livereload', 'compass:dev', 'uglify', 'watch']);
    
    // prod build
    grunt.registerTask('production', ['compass:prod']);

};

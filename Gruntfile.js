module.exports = function(grunt) {
  // cargar tareas npm
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-shared-config');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.initConfig({
    // mi npm json
    pkg: grunt.file.readJSON('package.json'),
    // Asset Copying
    copy: {
      jquery: {
        expand: true,
        cwd: 'compile/jquery/dist/',
        src: 'jquery.min.js',
        dest: 'public/javascripts/'
      },
      bootstrap: {
        expand: true,
        cwd: 'compile/bootstrap/dist/js/',
        src: 'bootstrap.min.js',
        dest: 'public/javascripts/'
      },
      mapbox_js: {
        expand: true,
        cwd: 'compile/mapbox.js/',
        src: 'mapbox.js',
        dest: 'public/javascripts/'
      },
      mapbox_css: {
        expand: true,
        cwd: 'compile/mapbox.js/',
        src: 'mapbox.css',
        dest: 'public/stylesheets/'
      }
    },
    // compilar arcgivo config.json (bootstrap customize) en compile/css/varibles.less
    shared_config: {
      default: {
        src: 'compile/config.json',
        dest: ['compile/css/variables.less']
      }
    },
    // less
    less: {
      development: {
        options: { compress: true },
        files: { 
          'public/stylesheets/base.css':'compile/css/base.less',
          'public/stylesheets/frontend.css':'compile/css/frontend.less',
          'public/stylesheets/backend.css':'compile/css/backend.less'
        }
      }
    },
    // compilador
    uglify: {
      options: { mangle: false },
      frontend: { files: { 'public/javascripts/frontend.js': ['compile/js/frontend.js'] }},
      backend: { files: { 'public/javascripts/backend.js': ['compile/js/backend.js'] }}
    },
    // inspeccion de archivos en tiempo real
    watch: {
      express: {
        files: ['bin/www', 'routes/**/*.js', 'views/**/*.ejs', '*.js'],
        tasks: ['express:defaults'],
        options: { livereload: true, spawn: false }
      },
      lesss: {
        files: ['compile/css/**/*.less', 'compile/css/**/*.css'],
        tasks: ['shared_config', 'less:development'],
        options: { livereload: true, spawn: false }
      },
      js_frontend: {
        files: ['compile/js/frontend.js'],
        tasks: ['uglify:frontend'],
        options: { livereload: true, spawn: false }
      },
      js_backend: {
        files: ['compile/js/backend.js'],
        tasks: ['uglify:backend'],
        options: { livereload: true, spawn: false }
      }
    },
    // servidor
    express: {
      options: { script: 'bin/www', port: 3000 },
      defaults: {}
    }
  })
  ;

  // registrar tareas grunt
  grunt.registerTask('default', ['express:defaults', 'watch']);
  grunt.registerTask('build', ['uglify', 'shared_config', 'less', 'copy'])

};

module.exports = function(grunt) {

  grunt.initConfig({
    // mi npm json
    pkg: grunt.file.readJSON('package.json'),
    // inspeccion de archivos en tiempo real
    watch: {
      express: {
        files: ['compile/js/*.js', 'index.html'],
        tasks: ['uglify', 'express:defaults'],
        options: {
          livereload: true,
          spawn: false
        }
      }
    },
    // compilador
    uglify: {
      all: {
        files: {
          'src/public/javascripts/lib.js': ['compile/js/jquery.min.js'],
          'src/public/javascripts/main.js': ['compile/js/init.js']
        }
      }
    },
    // servidor
    express: {
      options: {
        script: 'src/bin/www',
        port: 3000
      },
      defaults: {}
    }
  });

  // cargar tareas grunt
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-express-server');

  // registrar tareas grunt
  grunt.registerTask('default', ['express', 'watch']);
  grunt.registerTask('develop', ['express','watch']);

};

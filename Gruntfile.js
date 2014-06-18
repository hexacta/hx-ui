/*jshint node: true */
'use strict';

module.exports = function (grunt) {

	/**
	* Load required Grunt tasks matching the grunt-* pattern..
	* These are installed based on the versions listed in `package.json
	* when you do `npm install` in this directory.
	*/
	require('load-grunt-tasks')(grunt, {pattern: ['grunt-*']});
	require('time-grunt')(grunt);

	grunt.initConfig({
		yeoman: {
			src: 'src',
			dist: 'dist'
		},
		pkg: grunt.file.readJSON('package.json'),
		clean: [
			'<%= yeoman.dist %>'
		],
		concat: {
			all: {
				files: [{
					src: [
						'<%= yeoman.src %>/module.js',
						'<%= yeoman.src %>/directives/*.js'
					],
					dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
				}]
			}
		},
		jshint: {
			files: [
				'Gruntfile.js',
				'<%= yeoman.src %>/**/.js'
			],
			jshintrc: '.jshintrc'
		},
		karma: {
			unit: {
				configFile: 'karma.unit.js',
				background: false
			}
		},
		ngmin: {
			dist: {
				files: [{
					src: ['<%= yeoman.dist %>/*.js'],
					dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
				}]
			}
		}
	});

	grunt.registerTask('build', ['jshint', 'karma', 'clean', 'concat', 'ngmin']);
	grunt.registerTask('default', ['build']);

	grunt.registerTask('test', ['karma']);

};

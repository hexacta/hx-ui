/*jshint node: true */
'use strict';

module.exports = function(grunt) {

	/**
	* Load required Grunt tasks matching the grunt-* pattern..
	* These are installed based on the versions listed in `package.json
	* when you do `npm install` in this directory.
	*/
	require('load-grunt-tasks')(grunt, {pattern: 'grunt-*'});

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
		ngmin: {
			dist: {
				files: [{
					src: ['<%= yeoman.dist %>/*.js'],
					dest: '<%= yeoman.dist %>/<%= pkg.name %>.js'
				}]
			}
		}
	});

	grunt.registerTask('build', ['jshint', 'clean', 'concat', 'ngmin']);

};

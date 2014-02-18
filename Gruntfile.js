var packageFilePath = './package.json';
var packageFile = require(packageFilePath);

module.exports = function (grunt) {
	'use strict';

	grunt.initConfig({
		pkg: grunt.file.readJSON(packageFilePath),
		copy: {
			main: {
				expand: true,
				cwd: 'src',
				src: ['./assets/images/raw/**', './assets/fonts/**'],
				dest: './build/'
			}
		},
		compass: {
			dist: {
				options: {
					config: './config.rb',
					environment: 'production',
					outputStyle: 'compressed',
					noLineComments: true
				}
			}
		},
		imagemin: {
			dynamic: {
				files: [
					{
						expand: true,
						cwd: './build/assets/',
						src: '**/*.{png,jpg,gif}',
						dest: './build/assets'
					}
				]
			}
		},
		jshint: {
			main: {
				jshintrc: true,
				src: [
					'./src/assets/js/**/*.js',
					'./tests/**/*.js'
				]
			}
		},
		jasmine: {
			src: './src/assets/js/trillek/**/*.js',
			options: {
				keepRunner : true,
				specs: './specs/**/*.spec.js',
				template: require('grunt-template-jasmine-requirejs'),
				templateOptions: {
					requireConfigFile: './src/assets/js/require-config.js',
					requireConfig: {
						baseUrl: './src'
					}
				}
			}
		},
		jsdoc: {
			dist: {
				src: ['./src/assets/js/**/*.js'],
				options: {
					destination: 'doc'
				}
			}
		},
		requirejs: {
			compile: {
				options: {
					name: 'almond',
					baseUrl: './src',
					include: [
						'assets/js/main'
					],
					mainConfigFile: './src/assets/js/require-config.js',
					out: './build/assets/js/main.min.js',
					optimize: 'uglify2',
					wrap: true,
					uglify2: {
						mangle: true
					}
				}
			}
		},
		compress: {
			main: {
				options: {
					archive: ['dist/', packageFile.name, '-', packageFile.version, '.zip'].join(''),
					mode: 'zip'
				},
				files: [
					{
						expand: true,
						cwd: './build',
						src: ['**']
					}
				]
			}
		},
		watch: {
			test: {
				files: ['./src/**', './specs/**/*.spec.js'],
				tasks: 'test'
			}
		},
		clean: ['./build/assets/**', './doc']
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsdoc');

	grunt.registerTask('test', [
		'jasmine',
		'jshint'
	]);

	grunt.registerTask('test:continuous', [
		'test',
		'watch:test'
	]);

	grunt.registerTask('build', [
		'copy',
		'compass',
		'imagemin',
		'test',
		'jsdoc',
		'requirejs',
		'compress'
	]);

	grunt.registerTask('default', ['build']);
};
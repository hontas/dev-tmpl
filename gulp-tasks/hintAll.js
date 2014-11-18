var gulp = require('gulp'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	config = require('../config');

module.exports = function() {
	'use strict';

	return gulp.src(config.allJs)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
};

module.exports.dependencies = [];

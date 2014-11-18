var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemaps = require('gulp-sourcemaps'),
	config = require('../config');

module.exports = function() {
	'use strict';
	return gulp.src(config.src.lessFile)
		.pipe(sourcemaps.init())
		.pipe(less())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dist.styles));
};

module.exports.dependencies = [];

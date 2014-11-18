var gulp = require('gulp'),
	concat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps'),
	config = require('../config');

module.exports = function() {
	'use strict';
	return gulp.src(config.src.js)
		.pipe(sourcemaps.init())
		.pipe(concat('main.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(config.dist.script));
};

module.exports.dependencies = [];

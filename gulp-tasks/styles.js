var gulp = require('gulp'),
	config = require('../config');

module.exports = function() {
	'use strict';
	gulp.src(config.lessFile)
		.pipe(gulp.dest(config.dist.styles));
};

module.exports.dependencies = [];

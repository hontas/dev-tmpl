var gulp = require('gulp'),
	config = require('../config');

module.exports = function() {
	'use strict';
	return gulp.src(config.src.js)
		.pipe();
};

module.exports.dependencies = [];

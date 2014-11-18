var gulp = require('gulp'),
	changed = require('gulp-changed'),
	config = require('../config'),
	dest = config.dist.fonts;

module.exports = function() {
	'use strict';
    return gulp.src(config.assets.fonts)
        .pipe(changed(dest))
        .pipe(gulp.dest(dest));
};

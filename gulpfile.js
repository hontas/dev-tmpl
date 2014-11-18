/* jshint node: true, strict: false */
var gulp = require('gulp'),
	config = require('./config');

require('gulp-task-loader')();

gulp.task('dev', ['default', 'watch']);

gulp.task('default', ['test', 'build']);

gulp.task('build', ['styles', 'scripts']);

gulp.task('watch', function() {
	gulp.watch(config.allJs, ['hintAll']);
	gulp.watch(config.src.js, ['default']);
	gulp.watch(config.test.src, ['test']);
});

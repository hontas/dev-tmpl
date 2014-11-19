/* jshint node: true */

var src = 'src/';
var dist = 'dist/';
var test = 'test/';
var resources = 'bower_components/';

var script = src + 'js/';
var styles = src + 'less/';

module.exports = {
	allJs: [
		'**/*.js',
		'!' + dist + '**/*.js',
		'!' + resources + '**/*.js',
		'!node_modules/**/*.js'
	],

	src: {
		js: [ script + '**/*.js' ],
		less: [ styles + '**/*.less' ],
		lessFile: [ styles + 'main.less' ]
	},

	assets: {
		copyable: [ resources + 'component/*' ]
	},

	dist: {
		target: dist,
		script: dist + 'js',
		styles: dist + 'css',
		fonts: dist + 'fonts'
	},

	test: {
		config: 'karma.conf.js',
		src: [ test + '**/*.js' ]
	}
};

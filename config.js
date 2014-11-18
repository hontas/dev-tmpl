/* jshint node: true */
//var bowerCfg = require('./.bowerrc');

var src = 'src/';
var dist = 'dist/';
var test = 'test/';
var resources = 'bower_components/'; //bowerCfg && bowerCfg.directory ||

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
		fonts: [ resources + 'font-awesome/fonts/*' ]
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

/* jshint node: true */
var dist = 'dist/';
var resources = 'bower_components/';

module.exports = {
	src: {
		js: [
			'src/**/*.js'
		]
	},

	assets: [
		resources + 'font-awesome/fonts/'
	],

	dist: {
		target: [ dist ],
		styles: dist + 'css/'
	},

	test: {
		config: 'karma.conf.js',
		src: [
			'test/**/*.js',
		]
	}
};

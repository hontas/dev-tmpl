/* jshint node: true */
// Karma configuration
// Generated on Fri Nov 14 2014 00:13:12 GMT+0100 (CET)

var cfg = require('./config');

module.exports = function(config) {
	'use strict';
	config.set({

		// will be used to resolve files and exclude
		basePath: '',

		frameworks: ['mocha', 'sinon-chai'],

		// - '**/*.js'
		// - { pattern: '**/*.js', include: true|false }
		files: [].concat(cfg.src.js, cfg.test.src),

		exclude: [],

		// - nyan
		// - dots
		// - progress
		// - junit
		// - growl
		// - coverage
		reporters: ['nyan'],

		port: 9876,

		colors: true,

		// - config.LOG_DISABLE
		// - config.LOG_ERROR
		// - config.LOG_WARN
		// - config.LOG_INFO
		// - config.LOG_DEBUG
		logLevel: config.LOG_INFO,

		autoWatch: true,

		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],


		// No captured browser kill timeout [ms]
		captureTimeout: 60000,


		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: false
	});
};

var karma = require('karma').server,
	cfg = require('../config'),
	configFile = [process.cwd(), cfg.test.config].join('/');

module.exports = function(cb) {
	'use strict';
	karma.start({
		configFile: configFile,
		singleRun: true
	}, cb);
};

module.exports.dependencies = [];

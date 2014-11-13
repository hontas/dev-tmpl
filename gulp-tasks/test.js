var gulp = require('gulp'),
	karma = require('karma').server,
	config = require('../config'),
	karmaConf = '../karma.conf.js';

module.exports = function(cb) {
	karma.start({
		config: karmaConf
	}, cb);
};

module.exports.dependencies = [];

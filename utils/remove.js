var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function log(msg) {
		if (msg) {
			console.log(chalk.gray(msg));
		}
	}

	function done() {
		deferred.resolve(answers);
	}

	if (answers.cleanup) {
		console.log(chalk.red('Removing'), 'temporary files');
		cmd('rm', ['-rf', 'utils'])
			.then(done, deferred.reject, log);
	} else {
		deferred.resolve(answers);
	}

	return deferred.promise;
};

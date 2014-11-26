var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function log(progress) {
		if (answers.verbose && progress) {
			progress.replace(/\n|\r/g, '');
			console.log(chalk.gray(progress));
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

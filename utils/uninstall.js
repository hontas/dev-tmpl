var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');

module.exports = function(answers) {
	'use strict';

	function log(progress) {
		if (answers.verbose && progress) {
			progress.replace(/\n|\r/g, '');
			console.log(chalk.gray(progress));
		}
	}

	function done() {
		deferred.resolve(answers);
	}

	var deferred = Q.defer();

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(answers.dependencies));
		cmd('npm', ['uninstall'].concat(answers.dependencies))
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;
};

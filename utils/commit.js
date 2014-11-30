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

	function commit() {
		return cmd('git', ['commit', '-a', '-m', '"first commit"']);
	}

	function removeSetup() {
		if (answers.cleanup) {
			return cmd('git', ['rm', 'setup.js', '-f']);
		} else {
			Q.resolve();
		}
	}

	if (answers.setupGit) {
		console.log(chalk.green('First commit!'));
		cmd('git', ['add', '.'])
			.then(removeSetup, deferred.reject, log)
			.then(commit, deferred.reject, log)
			.then(done, deferred.reject, log);

	} else {
		done();
	}

	return deferred.promise;

};


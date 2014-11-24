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

	function commit() {
		return cmd('git', ['commit', '-a', '-m', '"first commit"'])
			.then(done, deferred.reject, log);
	}

	function removeSetup() {
		return cmd('git', ['rm', 'setup.js', '-f']);
	}

	if (answers.setupGit) {
		console.log(chalk.green('First commit!'));
		cmd('git', ['add', '.'])
			.then(removeSetup, deferred.reject, log)
			.then(commit, deferred.reject, log);

	} else {
		done();
	}

	return deferred.promise;

};


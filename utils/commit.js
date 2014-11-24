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
		return cmd('git', ['commit', '-a', '-m', '"first commit"']);
	}

	function removeSetup() {
		return cmd('git', ['rm', 'setup.js', '-f']);
	}

	if (answers.setupGit) {
		console.log(chalk.green('First commit!'));
		cmd('git', ['add', '.'])
			.then(removeSetup, deferred.reject)
			.then(commit, deferred.reject)
			.then(done);

	} else {
		done();
	}

	return deferred.promise;

};


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
		cmd('git', ['commit', '-a', '-m', '"first commit"'])
			.then(done, deferred.reject, log);
	}

	if (answers.setupGit) {
		console.log(chalk.green('First commit!'));
		cmd('git', ['rm', 'setup.js'])
			.then(commit, deferred.reject, log);

	} else {
		done();
	}

	return deferred.promise;

};


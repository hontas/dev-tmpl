var Q = require('q');
var cmd = require('./cmd');
var open = require('open');
var chalk = require('chalk');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function log(msg) {
		if (msg) {
			console.log(chalk.gray(msg));
		}
	}

	function clearGitHistory() {
		return cmd('rm', ['-rf', '.git']);
	}

	function initNewRepo() {
		return cmd('git', ['init']);
	}

	function setupRemoteOrigin() {
		return cmd('git', ['remote', 'add', 'origin', answers.repository]);
	}

	function done() {
		deferred.resolve(answers);
	}

	if (answers.setupGit) {
		open('https://github.com/new');
		console.log(chalk.green('Setting'), 'remote origin to', chalk.cyan(answers.repository));
		clearGitHistory()
			.then(initNewRepo)
			.then(setupRemoteOrigin)
			.then(done)
			.catch(deferred.reject);
	} else {
		clearGitHistory
			.then(done)
			.catch(deferred.reject);
	}

	return deferred.promise;

};

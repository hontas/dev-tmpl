var Q = require('q');
var cmd = require('./cmd');
var open = require('open');
var chalk = require('chalk');

module.exports = function(answers) {
	var deferred = Q.defer();

	function log(msg) {
		if (msg) {
			console.log(chalk.gray(msg));
		}
	}

	function done() {
		deferred.resolve(answers)
	}

	function commit() {
		console.log(chalk.cyan('Performing first commit'));
		cmd('git', ['commit', '-a', '-m', '"first commit"'])
			.then(done, deferred.reject, log);
	}

	function getUrl() {
		var arr = answers.repository.split('/');
		arr.pop();
		return arr.join('') + '/new';
	}

	if (answers.setupGit) {
		open(getUrl());
		console.log(chalk.green('Setting'), 'remote origin to', chalk.cyan(answers.repository));
		cmd('git', ['remote', 'set-url', 'origin', answers.repository])
			.then(commit, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;

};

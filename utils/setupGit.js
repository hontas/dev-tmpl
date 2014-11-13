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
		deferred.resolve(answers);
	}

	if (answers.setupGit) {
		open('https://github.com/new');
		console.log(chalk.green('Setting'), 'remote origin to', chalk.cyan(answers.repository));
		cmd('git', ['remote', 'set-url', 'origin', answers.repository])
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;

};

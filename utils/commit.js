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

	if (answers.setupGit) {
		console.log(chalk.green('First commit!'));
		cmd('git', ['commit', '-a', '-m', '"first commit"'])
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;

};


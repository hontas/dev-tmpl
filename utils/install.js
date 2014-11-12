var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = require('./dependencies');

module.exports = function(answers) {
	var deferred = Q.defer();

	function log(str) {
		if (str) {
			console.log(str);
		}
	}

	function updateBower() {
		console.log(chalk.green('Installing'), 'bower packages');
		return cmd('bower', ['install'].concat(dependencies.bower, '--save'))
	}

	function done() {
		deferred.resolve(answers);
	}

	console.log(chalk.green('Installing'), 'npm packages');
	cmd('npm', ['update'].concat(dependencies.npm, '--save-dev'))
		.then(updateBower, deferred.reject, log)
		.then(done, deferred.reject, log);

	deferred.resolve(answers);

	return deferred.promise;
};

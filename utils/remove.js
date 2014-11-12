var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = require('../package.json').dependencies;

function displayProgress(progress) {
	if (progress) {
		console.log(chalk.gray(data));
	}
}

module.exports = function(answers) {
	var deferred = Q.defer();

	function done(answers) {
		deferred.resolve(answers);
	}

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(Object.keys(dependencies)).join(' '));
		cmd('npm', ['uninstall'].concat(Object.keys(dependencies)))
			.then(done, null, displayProgress);
	} else {
		done(answers);
	}

	return deferred.promise;
};

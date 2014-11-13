var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var packageJson = require('../package.json');
var dependencies = packageJson.dependencies.concat(packageJson.devDependencies);

module.exports = function(answers) {
	var deferred = Q.defer();

	function log(progress) {
		if (progress) {
			console.log(chalk.gray(progress));
		}
	}

	function done() {
		console.log(chalk.green('Uninstalled successfull'));
		deferred.resolve(answers);
	}

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(Object.keys(dependencies).join(' ')));
		cmd('npm', ['uninstall'].concat(Object.keys(dependencies)))
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;
};

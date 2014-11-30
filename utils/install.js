var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = require('./dependencies');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function log(progress) {
		if (answers.verbose && progress) {
			progress.replace(/\n|\r/g, '');
			console.log(chalk.gray(progress));
		}
	}

	function installOrResolve(command, packages, saveFlag) {
		if (packages.length) {
			return cmd(command, ['install'].concat(packages, saveFlag));
		} else {
			return Q.resolve();
		}
	}

	function installBowerPackages() {
		console.log(chalk.green('Installing'), 'bower packages', chalk.gray(dependencies.bower.join(', ')));
		return installOrResolve('bower', dependencies.bower, '--save');
	}

	function installNpmPackages() {
		console.log(chalk.green('Installing'), 'npm packages', chalk.gray(dependencies.npm.join(', ')));
		return installOrResolve('npm', dependencies.npm, '--save-dev');
	}

	function done() {
		deferred.resolve(answers);
	}

	installNpmPackages()
		.then(installBowerPackages, deferred.reject, log)
		.then(done, deferred.reject, log);

	return deferred.promise;
};

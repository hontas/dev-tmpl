var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var pkgJson = require('../package.json');

module.exports = function(answers) {
	'use strict';

	function keys(obj) {
		return Object.keys(obj);
	}

	function log(progress) {
		if (progress) {
			console.log(chalk.gray(progress));
		}
	}

	function done() {
		console.log(chalk.green('Uninstalled successfull'));
		deferred.resolve(answers);
	}

	var deferred = Q.defer();
	var dependencies = [].concat(keys(pkgJson.dependencies), keys(pkgJson.devDependencies));

	console.log('dependencies', dependencies);

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(Object.keys(dependencies).join(' ')));
		cmd('npm', ['uninstall'].concat(Object.keys(dependencies)))
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;
};

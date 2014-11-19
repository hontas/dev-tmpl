var _ = require('lodash');
var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var pkgJson = require('../package.json');

module.exports = function(answers) {
	'use strict';

	function keys(obj) {
		return _.isObject(obj) ? Object.keys(obj) : [];
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

	function getDependencies() {
		var deps = pkgJson.dependencies;
		var devDeps = pkgJson.devDependencies;

		var depKeys = keys(deps);
		var devDepKeys = keys(devDeps);

		console.log(deps);
		console.log(devDeps);

		return [].concat(depKeys, devDepKeys);
	};

	var deferred = Q.defer();
	var dependencies = getDependencies();

	console.log(dependencies);

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(Object.keys(dependencies).join(' ')));
		cmd('npm', ['uninstall'].concat(Object.keys(dependencies)))
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;
};

var _ = require('lodash');
var Q = require('q');
var fs = require('fs');
var cmd = require('./cmd');
var chalk = require('chalk');
var pkgJson = require('../package.json');

module.exports = function(answers) {
	'use strict';

	function keys(obj) {
		return _.isObject(obj) ? Object.keys(obj) : [];
	}

	function log(progress) {
		if (answers.verbose && progress) {
			progress.replace(/\n|\r/g, '');
			console.log(chalk.gray(progress));
		}
	}

	function done() {
		deferred.resolve(answers);
	}

	function getDependencies() {
		var deps = keys(pkgJson.dependencies);
		var devDeps = keys(pkgJson.devDependencies);

		return [].concat(deps, devDeps);
	}

	var deferred = Q.defer();
	var dependencies = getDependencies();

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(dependencies));
		cmd('npm', ['uninstall'].concat(dependencies))
			.then(done, deferred.reject, log);
	} else {
		done();
	}

	return deferred.promise;
};

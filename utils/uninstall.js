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
		if (progress) {
			progress.replace(/\n|\r/g, '');
			console.log(chalk.gray(progress));
		}
	}

	function stringifine(json) {
		return JSON.stringify(json, null, '  ') + '\n';
	}

	function reWriteJson() {
		var pkgJsonPath = process.cwd() + '/package.json';
		delete pkgJson.dependencies;
		delete pkgJson.devDependencies;

		return Q.nfcall(fs.writeFile, pkgJsonPath, stringifine(pkgJson))
	}

	function done() {
		console.log(chalk.green('Successfully removed dependencies'));
		deferred.resolve(answers);
	}

	function getDependencies() {
		var deps = keys(pkgJson.dependencies);
		var devDeps = keys(pkgJson.devDependencies);

		return [].concat(deps, devDeps);
	};

	var deferred = Q.defer();
	var dependencies = getDependencies();

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages', chalk.gray(dependencies));
		cmd('npm', ['uninstall'].concat(dependencies))
			.then(reWriteJson, deferred.reject, log)
			.then(done, deferred.reject);
	} else {
		done();
	}

	return deferred.promise;
};

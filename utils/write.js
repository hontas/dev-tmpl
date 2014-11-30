var Q = require('q');
var _ = require('lodash');
var fs = require('fs');
var chalk = require('chalk');
var pkgJson = require('../package.json');
var createBowerJson = require('./createBowerJson');
var createPackageJson = require('./createPackageJson');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	function rememberDependencies() {
		function keys(obj) {
			return _.isObject(obj) ? Object.keys(obj) : [];
		}

		return [].concat(
			keys(pkgJson.dependencies),
			keys(pkgJson.devDependencies)
		);
	}

	function writeBowerJson() {
		console.log(chalk.green('Writing'), chalk.cyan('bower.json'));
		return Q.nfcall(fs.writeFile, process.cwd() + '/bower.json', createBowerJson(answers));
	}

	function writePackageJson() {
		console.log(chalk.green('Writing'), chalk.cyan('package.json'));
		return Q.nfcall(fs.writeFile, process.cwd() + '/package.json', createPackageJson(answers));
	}

	function done() {
		deferred.resolve(answers); // pass answers on
	}

	answers.dependencies = rememberDependencies();
	writePackageJson()
		.then(writeBowerJson, deferred.reject)
		.then(done, deferred.reject);

	return deferred.promise;
};

var Q = require('q');
var fs = require('fs');
var chalk = require('chalk');
var createBowerJson = require('./createBowerJson');
var createPackageJson = require('./createPackageJson');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	var bowerFile = process.cwd() + '/bower.json';
	var bowerJson = createBowerJson(answers);

	var packageFile = process.cwd() + '/package.json';
	var packageJson = createPackageJson(answers);

	function stringifine(json) {
		return JSON.stringify(json, null, '  ') + '\n';
	}

	function done() {
		deferred.resolve(answers); // pass answers on
	}

	console.log(chalk.green('Writing'), chalk.cyan('package.json'), '&', chalk.cyan('bower.json'));
	Q.all([
		Q.nfcall(fs.writeFile, bowerFile, stringifine(bowerJson)),
		Q.nfcall(fs.writeFile, packageFile, stringifine(packageJson))
	]).then(done, deferred.reject);

	return deferred.promise;
};

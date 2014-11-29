var Q = require('q');
var fs = require('fs');
var chalk = require('chalk');
var createBowerJson = require('./createBowerJson');
var createPackageJson = require('./createPackageJson');

module.exports = function(answers) {
	'use strict';
	var deferred = Q.defer();

	var bowerJson = createBowerJson(answers);
	var packageJson = createPackageJson(answers);

	console.log(packageJson);
	console.log(stringifine(packageJson));

	function stringifine(json) {
		return JSON.stringify(json, null, '  ') + '\n';
	}

	function writeBowerJson() {
		return Q.nfcall(fs.writeFile, process.cwd() + '/bower.json', stringifine(bowerJson));
	}

	function writePackageJson() {
		return Q.nfcall(fs.writeFile, process.cwd() + '/package.json', stringifine(packageJson));
	}

	function done() {
		deferred.resolve(answers); // pass answers on
	}

	console.log(chalk.green('Writing'), chalk.cyan('package.json'), '&', chalk.cyan('bower.json'));
	writePackageJson()
		.then(writeBowerJson, deferred.reject)
		.then(done, deferred.reject);

	return deferred.promise;
};

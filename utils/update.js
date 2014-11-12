var Q = require('q');
var fs = require('fs');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = Object.keys(require('../package.json').devDependencies);

module.exports = function(answers) {
	var deferred = Q.defer();

	// function log(str) {
	// 	if (str) {
	// 		console.log(str);
	// 	}
	// }

	// function updateBower() {
	// 	console.log(chalk.green('Updating'), 'bower packages');
	// 	return cmd('bower', ['update'])
	// }

	// function done() {
	// 	deferred.resolve(answers);
	// }

	// console.log(chalk.green('Updating'), 'npm packages');
	// cmd('npm', ['update'].concat(dependencies))
	// 	.then(updateBower, deferred.reject, log)
	// 	.then(done, deferred.reject, log);

	deferred.resolve(answers);

	return deferred.promise;
};

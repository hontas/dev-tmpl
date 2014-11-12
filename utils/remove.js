var Q = require('q');
var cmd = require('./cmd');
var chalk = require('chalk');
var dependencies = require('../package.json').dependencies;

module.exports = function(answers) {
	var deferred = Q.defer();

	if (answers.cleanup) {
		console.log(chalk.red('Uninstalling'), 'temporary packages');
		console.log(chalk.gray(['npm', 'uninstall'].concat(Object.keys(dependencies)).join(' ')));
		cmd('npm', ['uninstall'].concat(Object.keys(dependencies)))
		.then(function() {
			deferred.resolve(answers);
		});
	} else {
		deferred.resolve(answers);
	}

	return deferred.promise;
};

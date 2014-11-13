var Q = require('q');
var chalk = require('chalk');

module.exports = function(answers) {
	var deferred = Q.defer();

	if (answers.cleanup) {
		console.log(chalk.red('Removing'), 'temporary files');
		fs.rmdir(__dirname, function(err) {
			if (err) {
				deferred.reject(err);
			} else {
				deferred.resolve(answers);
			}
		});
	} else {
		console.log('no clean');
		deferred.resolve(answers);
	}

	return deferred.promise;
};

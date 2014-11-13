var Q = require('q');
var cmd = require('./cmd');

module.exports = function() {
	var deferred = Q.defer();
	var defaults = {
		name: process.cwd().split('/').pop(),
		version: '1.0.0',
		main: 'index.js',
		licence: 'MIT',
		private: false
	};

	function getValue(promise) {
		if (promise.state === 'fulfilled') {
			return promise.value.trim();
		}
	}

	// guess name / email / url from git/npm settings
	var promises = [
		cmd('git', ['config', '--get', '--global', 'user.name']),
		cmd('git', ['config', '--get', '--global', 'user.email']),
		cmd('npm', ['config', 'get', 'init.author.url']),
		cmd('npm', ['config', 'get', 'init.author.name']),
		cmd('npm', ['config', 'get', 'init.author.email'])
	];

	Q.allSettled(promises).spread(function(name, email, url, npmName, npmEmail) {
		defaults.author = getValue(name) || getValue(npmName);
		defaults.email = getValue(email) || getValue(npmEmail);
		defaults.url = getValue(url);

		if (defaults.url && defaults.name) {
			defaults.repository = defaults.url + '/' + defaults.name + '.git';
		}

		deferred.resolve(defaults);
	});

	return deferred.promise;
};

var Q = require('q');
var cmd = require('./cmd');

module.exports = function() {
	var deferred = Q.defer();
	var res = {
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
		res.author = getValue(name) || getValue(npmName);
		res.email = getValue(email) || getValue(npmEmail);
		res.url = getValue(url);

		if (res.url && res.name) {
			res.repository = res.url + '/' + res.name + '.git';
		}

		deferred.resolve(res);
	});

	return deferred.promise;
}

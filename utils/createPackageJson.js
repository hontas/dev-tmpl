var parseUrl = require('./parseUrl');
var createJsonFrom = require('./createJsonFrom');

module.exports = function(json) {
	'use strict';
	var properties = ['name', 'version', 'description', 'main', 'test', 'author', 'repository', 'keywords', 'licence'];
	var repo = parseUrl(json.repository);
	var matchProtocol = /^([a-z]+\:)?\/\//i;

	// update package.json from answers
	var pkg = createJsonFrom(properties, json, require('../package.json'));

	if (repo) {
		pkg.repository = {
			type: repo.type,
			url: repo.url.replace(matchProtocol, '')
		};

		pkg.bugs = {
			url: repo.repo + '/issues'
		};

		pkg.homepage = repo.repo;
	}

	return pkg;
};

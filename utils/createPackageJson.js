var parseUrl = require('./parseUrl');
var createJsonFrom = require('./createJsonFrom');

module.exports = function(json) {
	'use strict';
	var repo = parseUrl(json.repository);
	var protocolRegEx = /^([a-z]+\:)?\/\//i;
	var properties = [
		'name',
		'version',
		'description',
		'main',
		'scripts',
		'author',
		'keywords',
		'license'
	];

	var pkg = {};

	if (repo) {
		pkg.repository = {
			type: repo.type,
			url: repo.url.replace(protocolRegEx, '')
		};

		pkg.bugs = {
			url: repo.repo + '/issues'
		};

		pkg.homepage = repo.repo;
	}

	return createJsonFrom(properties, json, pkg);
};

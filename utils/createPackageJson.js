var parseUrl = require('./parseUrl');
var jsonUtil = require('./jsonUtil');

module.exports = function(answers) {
	'use strict';
	var repo = parseUrl(answers.repository);
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

	var pkg = jsonUtil.copyProps(properties, answers);

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

	return jsonUtil.stringifine(pkg);
};

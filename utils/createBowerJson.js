var createJsonFrom = require('./createJsonFrom');

module.exports = function(answers) {
	'use strict';
	var properties = [
		'name',
		'version',
		'description',
		'main',
		'keywords',
		'authors',
		'license',
		'private'
	];

	var pkg = {};

	if (answers.repository) {
		var repoArr = answers.repository.split('/');
		repoArr.pop();
		pkg.homepage = repoArr.join('/');
	}

	return createJsonFrom(properties, answers, pkg);
};

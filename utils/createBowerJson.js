var jsonUtil = require('./jsonUtil');

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

	var pkg = jsonUtil.copyProps(properties, answers);

	if (answers.repository) {
		var repoArr = answers.repository.split('/');
		repoArr.pop();
		pkg.homepage = repoArr.join('/');
	}

	return jsonUtil.stringifine(pkg);
};

var createJsonFrom = require('./createJsonFrom');

module.exports = function(json) {
	var properties = ['name', 'version', 'description', 'main', 'keywords', 'authors', 'licence', 'homepage', 'private'];
	var repo = json.repository;

	// update bower.json from answers
	var pkg = createJsonFrom(properties, json, require('../bower.json'));

	if (repo) {
		var repoArr = repo.split('/');
		repoArr.pop();
		pkg.homepage = repoArr.join('/');
	}

	return pkg;
};

var Q = require('q');
var _ = require('lodash');
var parseUrl = require('./parseUrl');
var chalk = require('chalk');

// configure to usa mustache style lookup
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = function(json) {
	var deferred = Q.defer();
	var repo = json.repository && parseUrl(json.repository);

	if (json.private === false) {
		delete json.private;
	}

	if (json.author) {
		if (json.email) {
			json.author += _.template(' <{{email}}>', json);
			json.authors = [json.author];
		}

		if (repo) {
			json.author += _.template(' ({{gitHome}})', { gitHome: repo.base });
		}
	}

	if (repo) {
		json.homepage = repo.repo;
	}

	if (json.keywords) {
		json.keywords = json.keywords.split(' ');
	}

	deferred.resolve(json);
	return deferred.promise;
};

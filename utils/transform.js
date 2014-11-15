var Q = require('q');
var _ = require('lodash');
var parseUrl = require('./parseUrl');

// configure to use a mustache style lookup
_.templateSettings.interpolate = /{{([\s\S]+?)}}/g;

module.exports = function(json) {
	'use strict';
	var deferred = Q.defer();
	var repo = json.repository && parseUrl(json.repository);

	if (json.private === false) {
		delete json.private;
	}

	function setAuthor(json) {
		if (json.author && json.email) {
			json.author += _.template(' <{{email}}>', json);
		}
	}

	function setAuthors(json) {
		if (json.author) {
			json.authors = [ json.author ];
		}
	}

	setAuthor(json);
	setAuthors(json);

	if (repo) {
		json.author += _.template(' ({{gitHome}})', { gitHome: repo.base });
		json.homepage = repo.repo;
	}

	json.keywords = json.keywords && json.keywords.split(' ');

	deferred.resolve(json);
	return deferred.promise;
};

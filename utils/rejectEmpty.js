var Q = require('q');

module.exports = function(json) {
	'use strict';
	var deferred = Q.defer();

	var res = Object.keys(json).reduce(function(res, key) {
		var val = json[key];
		if (val || val === false) {
			res[key] = val;
		}
		return res;
	}, {});

	deferred.resolve(res);
	return deferred.promise;
};

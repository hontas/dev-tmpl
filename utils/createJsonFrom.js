module.exports = function(properties, source, target) {
	'use strict';

	function stringifine(json) {
		return JSON.stringify(json, null, '  ') + '\n';
	}

	function copyValues(result, key) {
		var value = source[key];
		result[key] =  value ? value : value === false ? value : '';
		return result;
	}

	properties.reduce(copyValues, target);

	return stringifine(target);
};

module.exports = {
	copyProps: function(properties, source, target) {
		'use strict';

		function copyValues(result, key) {
			var value = source[key];

			if (value || value === false) {
				result[key] = value;
			}

			return result;
		}

		return properties.reduce(copyValues, target || {});
	},

	stringifine: function(json) {
		'use strict';
		return JSON.stringify(json, null, '  ') + '\n';
	}
};

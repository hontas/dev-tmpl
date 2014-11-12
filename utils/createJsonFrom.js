function contains(array, value) {
	return array.some(function(item) {
		return item == value;
	});
}

module.exports = function(properties, answers, json) {
	return Object.keys(json).reduce(function(res, key) {
		val = answers[key];
		if (contains(properties, key)) {
			if (val || val === false) {
				res[key] = val;
			}
		} else {
			res[key] = json[key];
		}

		return res;
	}, {});
};

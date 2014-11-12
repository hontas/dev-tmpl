module.exports = function(url) {
	if (!url) { return; }

	var res = {};
	var slashed = url.split('/');
	var fileName = slashed.pop();
	var punctured = fileName.split('.');
	var type = punctured.pop();
	var name = punctured.join('');

	return {
		url: url,
		repo: slashed.join('/') + '/' + name,
		base: slashed.join('/'),
		name: name,
		type: type
	};
};

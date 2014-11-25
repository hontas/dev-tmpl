module.exports = function() {
	'use strict';
	var args = process.argv.slice(2);
	var verbose = ['-v', '--verbose'];

	return args.some(function(argument) {
		return verbose.some(function(verb) {
			return verb === argument;
		});
	});
};

var open = require('open');
var cmd = require('./cmd');
var pack = require('../package.json');

var url = 'https://github.com/hontas/repos';

module.exports = function(answers) {
	open(answers.repository + '/new');
	return cmd('git', ['remote', 'add', 'origin', answers.repository])
		.then(function() {
			return cmd('git', ['ci', '-m', '"first commit"']);
		});
};

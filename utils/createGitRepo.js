var open = require('open');
var cmd = require('./cmd');
var pack = require('../package.json');

var url = 'https://github.com/hontas/repos';

module.exports = function(answers) {
	cmd('git', ['remote', 'add', 'origin', answers.repository]);
	open(answers.repository + '/new');
	cmd('git', ['ci', '-m', '"first commit"']);
};

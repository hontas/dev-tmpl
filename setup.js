/* jshint node: true */
var fs = require('fs');
var chalk = require('chalk');
var inquirer = require('inquirer');
var commit = require('./utils/commit');
var prompt = require('./utils/prompt');
var getDefaults = require('./utils/defaults');
var rejectEmpty = require('./utils/rejectEmpty');
var transform = require('./utils/transform');
var write = require('./utils/write');
var setupGit = require('./utils/setupGit');
var install = require('./utils/install');
var uninstall = require('./utils/uninstall');
var remove = require('./utils/remove');
var pkg = require('./package.json');

console.log(chalk.cyan('===================='));
console.log(chalk.green(' Dev Template'), chalk.gray(pkg.version));
console.log(chalk.cyan('===================='));

function displayFinito(args) {
	'use strict';
	var g = chalk.gray;
	var y = chalk.yellow;

	console.log(g('==============='));
	console.log(y(' Finito banana '));
	console.log(g('==============='));

	fs.unlink(process.cwd() + '/setup.js');

	return args;
}

function actOnInput(answers) {
	'use strict';
	transform(answers)
		.then(write)
		.then(setupGit)
		.then(uninstall)
		.then(install)
		.then(remove)
		.then(commit)
		.then(displayFinito)
		.catch(function(err) {
			console.log(chalk.red(err));
		});
}

function confirm(answers) {
	'use strict';
	console.log(answers);

	function handleAnswer(answer) {
		if (answer.confirm) {
			actOnInput(answers);
		} else {
			getUserInput(answers);
		}
	}

	inquirer.prompt({
		name: 'confirm',
		type: 'confirm',
		message: 'Look good?',
		default: true
	}, handleAnswer);
}

function getUserInput(defs) {
	'use strict';
	prompt(defs)
		.then(rejectEmpty)
		.then(confirm);
}

getDefaults()
	.then(getUserInput);

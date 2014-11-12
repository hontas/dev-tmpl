var Q = require('q');
var fs = require('fs');
var chalk = require('chalk');
var inquirer = require("inquirer");
var promptUser = require('./utils/prompt');
var getDefaults = require('./utils/defaults');
var rejectEmpty = require('./utils/rejectEmpty');
var transform = require('./utils/transform');
var write = require('./utils/write');
var remove = require('./utils/remove');
var update = require('./utils/update');
var pkg = require('./package.json');

var g = chalk.gray;
var y = chalk.yellow;

console.log(chalk.cyan('===================='));
console.log(chalk.green(' Dev Template'), chalk.gray(pkg.version));
console.log(chalk.cyan('===================='));

getDefaults()
	.then(getUserInput);

function getUserInput(defs) {
	promptUser(defs)
		.then(rejectEmpty)
		.then(confirm);
}

function confirm(answers) {
	console.log(answers);

	inquirer.prompt({
		name: 'confirm',
		type: 'confirm',
		message: 'Look good?',
		default: true
	}, function(answer) {
		if (answer.confirm) {
			actOnInput(answers);
		} else {
			getUserInput(answers);
		}
	});
}

function actOnInput(answers) {
	transform(answers)
		.then(write)
		.then(remove)
		.then(update)
		.then(cleanUtils)
		.catch(function(err) {
			console.log(chalk.red(err));
		});
}

function cleanUtils(answers) {
	if (answers.cleanup) {
		console.log(chalk.red('Removing'), 'temporary files');
		fs.rmdir('utils', displayFinito);
	} else {
		displayFinito();
	}
}

function displayFinito() {
	var g = chalk.gray;
	var y = chalk.yellow;

	console.log(g('==============='));
	console.log(y(' Finito banana '));
	console.log(g('==============='));
}

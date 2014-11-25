/* jshint node: true, latedef: false */
var fs = require('fs');
var chalk = require('chalk');
var inquirer = require('inquirer');
var pkg = require('./package.json');
var m = require('require-dir')('utils');

console.log(chalk.cyan('===================='));
console.log(chalk.green(' Dev Template'), chalk.gray(pkg.version));
console.log(chalk.cyan('===================='));

function displayFinito(answers) {
	'use strict';
	var g = chalk.gray;
	var y = chalk.yellow;

	console.log(g('==============='));
	console.log(y(' Finito banana '));
	console.log(g('==============='));

	if (answers.cleanup && !answers.setupGit) {
		fs.unlinkSync(process.cwd() + '/setup.js');
	}
}

function displayError(err) {
	'use strict';
	console.log(chalk.red(err));
}

function actOnInput(answers) {
	'use strict';
	m.transform(answers)
		.then(m.write)
		.then(m.setupGit)
		.then(m.uninstall)
		.then(m.install)
		.then(m.remove)
		.then(m.commit)
		.then(displayFinito)
		.catch(displayError);
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
	m.prompt(defs)
		.then(m.rejectEmpty)
		.then(confirm)
		.catch(displayError);
}

m.defaults()
	.then(getUserInput)
	.catch(displayError);

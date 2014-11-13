var Q = require('q');
var inquirer = require("inquirer");

function willSetupGit(answers) {
    return answers.setupGit;
}

module.exports = function (defaults) {
	var deferred = Q.defer();
    var questions = [
        {
            'name': 'name',
            'message': 'name',
            'default': defaults.name,
            'type': 'input',
            filter: function(input) {
                return input.replace(' ', '-').replace(/^[._]*/, '');
            }
        },
        {
            'name': 'version',
            'message': 'version',
            'default': defaults.version,
            'type': 'input'
        },
        {
            'name': 'description',
            'message': 'description',
            'default': defaults.description,
            'type': 'input'
        },
        {
            'name': 'main',
            'message': 'main file',
            'default': defaults.main,
            'type': 'input'
        },
        {
            'name': 'setupGit',
            'message': 'setup git',
            'default': defaults.setupGit,
            'type': 'confirm'
        },
        {
            'name': 'repository',
            'message': 'git repository',
            'default': function(answers) {
                console.log(answers);
                return defaults.repository;
            },
            'type': 'input',
            'when': willSetupGit
        },
        {
            'name': 'keywords',
            'message': 'keywords',
            'default': defaults.keywords,
            'type': 'input'
        },
        {
            'name': 'author',
            'message': 'author',
            'default': defaults.author,
            'type': 'input'
        },
        {
            'name': 'email',
            'message': 'email',
            'default': defaults.email,
            'type': 'input'
        },
        {
            'name': 'licence',
            'message': 'licence',
            'default': defaults.licence,
            'type': 'input',
            'choices': ['MIT', 'ISC', 'BSD', 'GPL']
        },
        {
            'name': 'private',
            'message': 'mark package as private',
            'default': defaults.private,
            'type': 'confirm'
        },
        {
            'name': 'cleanup',
            'message': 'Remove temp files?',
            'default': true,
            'type': 'confirm'
        }
    ];

    inquirer.prompt(questions, deferred.resolve);

	return deferred.promise;
}

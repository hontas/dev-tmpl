var Q = require('q');
var inquirer = require('inquirer');

module.exports = function (defaults) {
    'use strict';
    var deferred = Q.defer();

    function willSetupGit(answers) {
        return answers.setupGit;
    }

    function clenseName(name) {
        return name
            .replace(' ', '-')
            .replace(/^[._]*/, '');
    }

    function getRepo(answers) {
        return defaults.repository.replace(defaults.name, answers.name);
    }

    var questions = [
        {
            'name': 'name',
            'message': 'name',
            'default': defaults.name,
            'type': 'input',
            filter: clenseName
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
            'default': getRepo,
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
};

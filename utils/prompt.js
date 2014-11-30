var Q = require('q');
var inquirer = require('inquirer');

module.exports = function (defaults) {
    'use strict';
    var deferred = Q.defer();

    function willSetupGit(answers) {
        return inSlowMode(answers) && answers.setupGit;
    }

    function clenseName(name) {
        return name
            .replace(' ', '-')
            .replace(/^[._]*/, '');
    }

    function inSlowMode(answers) {
        return !answers.quick;
    }

    function getRepo(answers) {
        return defaults.repository.replace(defaults.name, answers.name);
    }

    var questions = [
        {
            'name': 'quick',
            'message': 'quick mode',
            'default': defaults.quick,
            'type': 'confirm'
        },
        {
            'name': 'name',
            'message': 'name',
            'default': defaults.name,
            'type': 'input',
            filter: clenseName,
            'when': inSlowMode
        },
        {
            'name': 'version',
            'message': 'version',
            'default': defaults.version,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'description',
            'message': 'description',
            'default': defaults.description,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'main',
            'message': 'main file',
            'default': defaults.main,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'setupGit',
            'message': 'setup git',
            'default': defaults.setupGit,
            'type': 'confirm',
            'when': inSlowMode
        },
        {
            'name': 'repository',
            'message': 'git repository',
            'default': getRepo,
            'type': 'input',
            'when': willSetupGit
        },
        {
            'name': 'test',
            'message': 'test command',
            'default': defaults.test,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'keywords',
            'message': 'keywords',
            'default': defaults.keywords,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'author',
            'message': 'author',
            'default': defaults.author,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'email',
            'message': 'email',
            'default': defaults.email,
            'type': 'input',
            'when': inSlowMode
        },
        {
            'name': 'license',
            'message': 'license',
            'default': defaults.license,
            'type': 'input',
            'choices': ['MIT', 'ISC', 'BSD', 'GPL'],
            'when': inSlowMode
        },
        {
            'name': 'private',
            'message': 'mark package as private',
            'default': defaults.private,
            'type': 'confirm',
            'when': inSlowMode
        },
        {
            'name': 'cleanup',
            'message': 'Remove temp files?',
            'default': defaults.cleanup,
            'type': 'confirm',
            'when': inSlowMode
        },
        {
            'name': 'verbose',
            'message': 'Verbose output?',
            'default': defaults.verbose,
            'type': 'confirm',
            'when': inSlowMode
        }
    ];

    inquirer.prompt(questions, function(answers) {
        if (inSlowMode(answers)) {
            deferred.resolve(answers);
        } else {
            defaults.repository = getRepo(defaults);
            deferred.resolve(defaults);
        }
    });

	return deferred.promise;
};

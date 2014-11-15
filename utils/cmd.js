var Q = require('q');
var cp = require('child_process');

module.exports = function(command, args, options) {
    'use strict';
    var stderr = '';
    var stdout = '';
    var deferred = Q.defer();
    var process = cp.spawn(command, args, options);

    process.stdout.on('data', function (data) {
        data = data.toString();
        deferred.notify(data);
        stdout += data;
    });

    process.stderr.on('data', function (data) {
        data = data.toString();
        deferred.notify(data);
        stderr += data;
    });

    process.on('error', function (error) {
        return deferred.reject(error);
    });

    process.on('close', function (code) {
        function getError() {
            var fullCommand = command + args.length ? ' ' + args.join(' ') : '';
            return 'Failed to execute "' + fullCommand + '", exit code of #' + code, 'ECMDERR';
        }

        if (code) {
            if (!Array.isArray(args)) {
                args = [];
            }

            return deferred.reject(getError());
        }

        return deferred.resolve(stdout);
    });

    return deferred.promise;
};

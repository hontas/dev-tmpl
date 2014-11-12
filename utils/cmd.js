var Q = require('q');
var cp = require('child_process');

module.exports = function(command, args, options, log) {
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
        var fullCommand;
        var error;

        if (code) {
            if (!Array.isArray(args)) {
                args = [];
            }

            fullCommand = command;
            fullCommand += args.length ? ' ' + args.join(' ') : '';

            error = 'Failed to execute "' + fullCommand + '", exit code of #' + code, 'ECMDERR';

            return deferred.reject(error);
        }

        return deferred.resolve(stdout);
    });

    return deferred.promise;
};

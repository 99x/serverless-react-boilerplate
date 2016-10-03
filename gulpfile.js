var gulp = require('gulp'),
    isWin = /^win/.test(process.platform),
    commandSeparator = isWin ? '&' : ';',
    webpack = require('webpack');

function runCommand(cmd) {
    var exec = require('child_process').exec,
        ls = exec(cmd);
    ls.stdout.on('data', function(data) {
        console.log(data);
    });
    ls.stderr.on('data', function(data) {
        console.log(data);
    });
}

/* Start dynamodb local instancecls */
gulp.task('start-dynamodb', function(done) {
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb start');
});

/* Start offline server for local development */
gulp.task('start-offline-server', function(done) {
    runCommand('cd serverless ' + commandSeparator + 'serverless offline start');
});

gulp.task('start-client', function(done) {
    runCommand('cd web ' + commandSeparator + ' webpack-dev-server');
});

gulp.task('app', ['start-dynamodb', 'start-offline-server', 'start-client']);

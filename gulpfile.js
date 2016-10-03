var gulp = require('gulp'),
    isWin = /^win/.test(process.platform),
    commandSeparator = isWin ? '&' : ';',
    webpack = require('webpack'),
    exec = require('child_process').exec,
    gulpSequence = require('gulp-sequence');

function runCommand(cmd, done) {
    var ls = exec(cmd);
    ls.stdout.on('data', function(data) {
        console.log(data);
    });
    ls.stderr.on('data', function(data) {
        console.log(data);
    });
    ls.on('close', function(data) {
        done();
    });
}

/* Install dynamodb locally */
gulp.task('install-dynamodb', function(done) {
    console.log('This will take about 1 minute to complete at first run');
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb install', done);
});

/* Start dynamodb local instance */
gulp.task('start-dynamodb', function(done) {
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb start', done);
});

/* Start offline server for local development */
gulp.task('start-offline-server', function(done) {
    runCommand('cd serverless ' + commandSeparator + 'serverless offline start', done);
});

/* Start offline server for local development */
gulp.task('start-client', function(done) {
    runCommand('cd web ' + commandSeparator + 'webpack-dev-server', done);
});

/* Start offline server for local development */
gulp.task('open-website', function(done) {
    require("opn")("http://localhost:8080");
});

/* Remove dynamodb local instance */
gulp.task('uninstall-dynamodb', function(done) {
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb remove', done);
});

/* Deploy service in AWS */
gulp.task('deploy', ['uninstall-dynamodb'], function() {
    runCommand('cd serverless' + commandSeparator + ' sls deploy');
});

/* Start application locally */
gulp.task('default', gulpSequence('install-dynamodb', ['start-client', 'open-website', 'start-dynamodb', 'start-offline-server']));

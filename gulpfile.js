var gulp = require('gulp'),
    isWin = /^win/.test(process.platform),
    commandSeparator = isWin ? '&' : ';',
    webpack = require('webpack'),
    exec = require('child_process').exec,
    util = require('gulp-util'),
    gulpSequence = require('gulp-sequence'),
    stage = null;

function runCommand(cmd, done) {
    var ls = exec(cmd);
    ls.stdout.on('data', function(data) {
        console.log(data);
    });
    ls.stderr.on('data', function(data) {
        console.log(data);
    });
    ls.on('close', function(data) {
        done && done();
    });
}

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

/* Deploy the local database tables to AWS dynamodb */
gulp.task('deploy-db', function(cb) {
    stage = (util.env.stage) ? "--stage " + util.env.stage : "";
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb executeAll ' + stage);
});

/* Deploy Lambdas and API Gateway to AWS */
gulp.task('deploy-api', function(cb) {
    runCommand('cd serverless' + commandSeparator + ' sls deploy ' + stage + ' -v');
});

/* Deploy service in AWS */
gulp.task('deploy', gulpSequence(['deploy-db', 'deploy-api']));

/* Start application locally */
gulp.task('serve', gulpSequence(['start-client', 'open-website', 'start-dynamodb', 'start-offline-server']));
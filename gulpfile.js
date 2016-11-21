var gulp = require('gulp'),
    isWin = /^win/.test(process.platform),
    commandSeparator = isWin ? '&' : ';',
    webpack = require('webpack'),
    exec = require('child_process').exec,
    util = require('gulp-util'),
    gulpSequence = require('gulp-sequence'),
    stage;

if (util.env.stage === undefined) {
    util.env.stage = 'local';
}

stage = '--stage ' + util.env.stage;

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
gulp.task('start-dynamodb', function(cb) {
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb start', cb);
});

/* Start offline server for local development */
gulp.task('start-offline-server', function(cb) {
    runCommand('cd serverless ' + commandSeparator + 'serverless offline start', cb);
});

/* Start offline server for local development */
gulp.task('start-client', function(cb) {
    runCommand('cd web ' + commandSeparator + 'webpack-dev-server --history-api-fallback', cb);
});

/* Start offline server for local development */
gulp.task('open-website', function(cb) {
    require("opn")("http://localhost:8080");
    cb();
});

/* Deploy the local database tables to AWS dynamodb */
gulp.task('deploy-db', function(cb) {    
    runCommand('cd serverless' + commandSeparator + ' sls dynamodb executeAll ' + stage, cb);
});

/* Deploy Lambdas and API Gateway to AWS */
gulp.task('deploy-api', function(cb) {
    runCommand('cd serverless' + commandSeparator + ' sls deploy ' + stage + ' -v', cb);
});

/* In the serverless folder, copy env.{stage}.yml file to env.yml */
gulp.task('copy-env-config', function(cb) {
    runCommand(
        'cp ./web/webpack.' + util.env.stage + '.config.js ./web/webpack.config.js'
        + commandSeparator + 'cp ./serverless/env.' + util.env.stage + '.yml ./serverless/env.yml', cb
    );
});

/* Build the react app */
gulp.task('build-web', function(cb) {
    var webpackCmd = (util.env.stage === 'local') ? 'NODE_ENV=development webpack -d' : 'NODE_ENV=production webpack';
    runCommand(
        'cd web' + commandSeparator + webpackCmd, cb
    );
});

/* Sync react app web folder to s3 bucket -- modify to deploy to your environments based on stage */
gulp.task('sync-web-s3', function(cb) {
    runCommand('cd web' + commandSeparator
        + 'aws s3 sync . s3://sls-react-auth --exclude "*node_modules/*" --acl public-read --delete', cb);
});

/* Deploy front end client */
gulp.task('deploy-web', function(cb) {
    if (util.env.stage === 'local') {
        gulpSequence('copy-env-config', ['start-client', 'open-website'], cb);
    } else {
        gulpSequence('copy-env-config', 'build-web', 'sync-web-s3', cb);
    }
});

/* Deploy service in AWS */
gulp.task('deploy', gulpSequence('copy-env-config', 'deploy-api', 'deploy-web'));

/* Start application locally */
gulp.task('serve', gulpSequence(['start-client', 'open-website', 'start-dynamodb', 'start-offline-server']));
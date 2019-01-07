let gulp = require("gulp"),
  isWin = /^win/.test(process.platform),
  commandSeparator = isWin ? "&" : ";",
  webpack = require("webpack"),
  exec = require("child_process").exec,
  stage = null;

function runCommand(cmd, done) {
  let ls = exec(cmd);
  ls.stdout.on("data", function(data) {
    console.log(data);
  });
  ls.stderr.on("data", function(data) {
    console.log(data);
  });
  ls.on("close", function(data) {
    done && done();
  });
}

/* Install dynamodb local instance */
gulp.task("install-dynamodb", function(done) {
  runCommand("cd api" + commandSeparator + " sls dynamodb install", done);
});

/* Start dynamodb local instance */
gulp.task("start-dynamodb", function(done) {
  runCommand("cd api" + commandSeparator + " sls dynamodb start", done);
});

/* Start offline server for local development */
gulp.task("start-offline-server", function(done) {
  runCommand(
    "cd api " +
      commandSeparator +
      "cd todo " +
      commandSeparator +
      "serverless offline start",
    done
  );
});

/* Start offline server for local development */
gulp.task("start-client", function(done) {
  runCommand("cd web " + commandSeparator + "npm run start", done);
});

/* Start application locally */
gulp.task("serve", gulp.parallel("start-offline-server", "start-client"));

'use strict';

// Your first function handler
module.exports.auth = (event, context, cb) => {
    context.succeed("im auth function");
};

// You can add more handlers here, and reference them in serverless.yml

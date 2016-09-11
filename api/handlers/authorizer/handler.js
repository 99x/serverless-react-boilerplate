'use strict';

var authorize = require('./lib/authorize');
// Your first function handler
module.exports.authorizer = (event, context, cb) => {
    authorize.validate(context, event);
};



// You can add more handlers here, and reference them in serverless.yml

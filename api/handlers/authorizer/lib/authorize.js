'use strict';

const policy = require('./policy.json');

module.exports.validate = (context, event) => {
    context.succeed({
        "principalId": "manoj",
        "policyDocument": policy
    });
};

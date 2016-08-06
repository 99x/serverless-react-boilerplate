'use strict';

const jwt = require('jsonwebtoken'),
    AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || 'secretKey'; // Bug in serverless beta?  Doesn't forward the environment variable. Default value is set until the bug is resolved.

function authenticate(user) {
    return jwt.sign(user, AUTH_TOKEN_SECRET);
}

function decode(token) {
    return jwt.verify(token, AUTH_TOKEN_SECRET);
}

module.exports = {
    authenticate,
    decode
};

'use strict';

var authorize = require('./lib/authorize');

module.exports.authorizer = (event, context, cb) => {
    const token = decodeURIComponent(event.authorizationToken);
    authorize.validate(token, context, event);
};

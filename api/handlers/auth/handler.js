'use strict';

var auth = require('./lib/auth');

module.exports.auth = (event, context, cb) => {
    var data = JSON.parse(event.data);
    var path = event.path;

    switch (path) {
        case '/login':
            auth.login(data, context);
            break;
        case '/signup':
            auth.signup(data, context);
            break;
        default:
            context.fail('Invalid api path');
    }
};

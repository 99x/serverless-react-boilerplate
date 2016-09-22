'use strict';

var Promise = require('bluebird'),
    helper = require('./helper');

module.exports.signup = (data, context, event) => {
    if (!data.email) {
        return context.fail("Error: email is missing.");
    }
    var User = {
        email: data.email.toLowerCase(),
        name: data.name,
        clearPassword: data.password
    };
    helper.createUser(User).then(status => {
        context.succeed(status);
    }).catch(err => {
        context.fail("Error: " + err);
    });
};

module.exports.login = (data, context, event) => {
    if (!(data.email && data.password)) {
        return context.fail("Error: missing login parameters.");
    }
    var email = data.email.toLowerCase();
    var clearPassword = data.password;

    var loginUser = helper.getUser(email),
        verifyUser = loginUser.then(user => {
            return helper.computeHash(clearPassword, user.salt);
        });

    return Promise.join(loginUser, verifyUser, function(user, hash) {
        var correctHash = user.hash;
        if (hash.toString('base64') === correctHash) {
            return helper.createJWT(email).then(token => {
                context.succeed({
                    token: token
                });
            });
        } else {
            context.fail("Error: login failed.");
        }
    }).catch(err => {
        context.fail("Error: " + error);
    });
};

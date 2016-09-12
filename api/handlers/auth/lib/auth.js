'use strict';

var helper = require('./helper');

module.exports.login = (data, context) => {
    context.succeed("success");
};

module.exports.signup = (data, context) => {
    if (!data.email) {
        return context.fail("Error: email is missing.");
    }
    var User = {
        email: data.email.toLowerCase(),
        name: data.name,
        clearPassword: data.password
    };

    helper.createUser(User, function(err) {
        if (!err) {
            context.succeed({
                status: "success"
            });
        } else {
            context.fail("Error: ", err);
        }
    });
};

module.exports.login = function(data, context) {
    if (!(data.email && data.password)) {
        return context.fail("Error: missing loggin parameters.");
    }
    var email = data.email.toLowerCase(),
        clearPassword = data.password;

    helper.getUser(email, function(err, data) {
        if (err) {
            return context.fail("Error: internal server error.", err);
        }
        if (!data.Item) {
            return context.fail("Error: user not found.");
        }
        var correctHash = data.Item.hash,
            salt = data.Item.salt;

        helper.computeHash(clearPassword, salt, function(err, salt, hash) {
            if (err) {
                context.fail("Error: internal server error, ", err);
            } else {
                if (hash === correctHash) {
                    helper.createJWT(email, function(err, token) {
                        if (err) {
                            context.fail("Error: internal server error, ", err);
                        } else {
                            context.succeed({
                                token: token
                            });
                        }
                    });
                } else {
                    context.fail("Error: login failed.");
                }
            }
        });
    });
};

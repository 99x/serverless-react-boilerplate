'use strict';

var AWS = require('aws-sdk'),
    crypto = require('crypto'),
    jwt = require('jwt-simple');

const JWT_SECRET = 'my_super_secrect_key',
    JWT_ALGORITHM = "HS256",
    CRYPTO_LENGTH = 128,
    CRYPTO_ITERATIONS = 4096;

var dynamodb = new AWS.DynamoDB.DocumentClient();

var createJWT = function(email, fn) {
    var params = {
        TableName: 'manoj-users',
        Key: {
            email: email
        },
        ProjectExpression: 'jwt_id'
    };

    dynamodb.get(params, function(err, data) {
        if (err) {
            return fn(err);
        }
        var user = data.Item;
        if (!user) {
            fn("Error: user not found");
        } else {
            var token = jwt.encode({
                jwt_id: user.jwt_id,
                email: email
            }, JWT_SECRET, JWT_ALGORITHM);
            fn(null, token);
        }
    });
};
module.exports.createJWT = createJWT;

var createToken = function(fn, length) {
    crypto.randomBytes(length || CRYPTO_LENGTH, function(err, token) {
        if (err)
            return fn(err);
        else
            fn(null, token.toString('hex'));
    });
};
module.exports.createToken = createToken;

var computeHash = function(password, salt, fn) {
    if (3 == arguments.length) {
        crypto.pbkdf2(password, salt, CRYPTO_ITERATIONS, CRYPTO_LENGTH, function(err, derivedKey) {
            if (err)
                return fn(err);
            else
                fn(null, salt, derivedKey.toString('base64'));
        });
    } else {
        fn = salt;
        crypto.randomBytes(CRYPTO_LENGTH, function(err, salt) {
            if (err)
                return fn(err);
            salt = salt.toString('base64');
            computeHash(password, salt, fn);
        });
    }
};
module.exports.computeHash = computeHash;

var getUser = function(email, fn) {
    var params = {
        TableName: 'manoj-users',
        Key: {
            email: email
        }
    };

    dynamodb.get(params, function(err, data) {
        if (err) {
            fn(err);
        } else {
            fn(null, data);
        }
    });
};
module.exports.getUser = getUser;

var createUser = function(User, fn) {
    createToken(function(err, token) {
        if (!err) {
            computeHash(User.clearPassword, function(err, salt, hash) {
                createToken(function(err, jwt_id) {
                    var params = {
                        TableName: 'manoj-users',
                        Item: {
                            email: User.email,
                            name: User.name,
                            salt: salt,
                            hash: hash,
                            jwt_id: jwt_id
                        },
                        ConditionExpression: 'attribute_not_exists (email)'
                    };
                    dynamodb.put(params, function(err) {
                        if (err) {
                            return fn(err);
                        } else {
                            fn(null, token);
                        }
                    });
                }, 32);
            });
        }
    });
};
module.exports.createUser = createUser;

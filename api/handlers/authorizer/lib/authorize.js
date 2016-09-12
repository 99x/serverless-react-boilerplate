'use strict';

var jwt = require('jwt-simple'),
    policy = require('./policy.json'),
    AWS = require('aws-sdk');


const JWT_SECRET = "my_super_secrect_key",
    JWT_ALGORITHM = "HS256;";

var dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.validate = (token, context, event) => {
    var payload, params;
    try {
        payload = jwt.decode(token, JWT_SECRET, false, JWT_ALGORITHM);
    } catch (err) {
        return context.fail("Unauthorized: Error in decoding token, ", err);
    }

    params = {
        TableName: "manoj-users",
        Key: {
            email: payload.email
        }
    };

    dynamodb.get(params, function(err, data) {
        if (err) {
            context.fail("Unauthorized: Error occured in getting user information, ", err);
        }
        var user = data.Item;
        if (!user) {
            context.fail("Unauthorizd: Not having access to the user, ", err);
        } else if (user.jwt_id === payload.jwt_id) {
            var principalId = new Buffer(JSON.stringify(user)).toString('base64');
            context.succeed({
                "principalId": principalId,
                "policyDocument": policy
            });
        } else {
            context.fail("Unauthorizd");
        }
    });
};

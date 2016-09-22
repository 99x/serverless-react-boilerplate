'use strict';

var Promise = require('bluebird'),
    jwt = require('jwt-simple'),
    policy = require('./policy.json'),
    db = require('../../../database/dynamodb');

const JWT_SECRET = "my_super_secrect_key";
const JWT_ALGORITHM = "HS256";

/* First, decode the token sent by client and verify the jwt_id to prevent token hacks.
 * Then return principalId as the user and policyDocument to make API Calls.
 */
module.exports.validate = (token, context, event) => {
    var payload, params;
    try {
        payload = jwt.decode(token, JWT_SECRET, false, JWT_ALGORITHM);
    } catch (err) {
        return context.fail("Unauthorized: Error in decoding token, ", err);
    }

    return db('get', {
        TableName: 'users',
        Key: {
            email: payload.email
        },
        ProjectExpression: 'jwt_id'
    }).then(result => {
        const user = result.Item;
        if (!user) context.fail("Unauthorizd: Not having access to the user.");
        if (user.jwt_id === payload.jwt_id) {
            var principalId = new Buffer(JSON.stringify(user)).toString('base64');
            context.succeed({
                "principalId": principalId,
                "policyDocument": policy
            });
        }
    }).catch(err => {
        context.fail("Unauthorized: Error occured in getting user information. " + err);
    });

};

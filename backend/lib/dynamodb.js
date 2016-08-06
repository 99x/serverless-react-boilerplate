'use strict';

const Promise = require('bluebird');
const DynamoDB = require('aws-sdk').DynamoDB;

// const dynamoConfig = {
//     sessionToken: process.env.AWS_SESSION_TOKEN,
//     region: process.env.SERVERLESS_REGION
// };

const client = new DynamoDB.DocumentClient();

module.exports = (method, params) => {
    return Promise.fromCallback(cb => client[method](params, cb));
};

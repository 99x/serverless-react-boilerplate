'use strict';

const Promise = require('bluebird');
const AWS = require('aws-sdk');
const client = new AWS.DynamoDB.DocumentClient();

module.exports = (method, params) => {
    return Promise.fromCallback(cb => client[method](params, cb));
};

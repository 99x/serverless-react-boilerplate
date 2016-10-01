'use strict';

var Promise = require('bluebird'),
    db = require('../../../database/dynamodb');

function getAllTodos(email) {
    return db('query', {
        TableName: 'todos',
        IndexName: 'Index',
        KeyConditionExpression: 'HashKey = :hkey and RangeKey > :rkey',
        ExpressionAttributeValues: {
            ':hkey': 'key',
            ':rkey': 2015
        }
    });
}

module.exports = {
    getAllTodos: getAllTodos
};

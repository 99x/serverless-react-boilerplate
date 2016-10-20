'use strict';

var Promise = require('bluebird'),
    dotenv = require('dotenv').config(),
    db = require('../../../database/dynamodb');

const DB_PREFIX = process.env.IS_OFFLINE ? "dev" : process.env.REMOTE_STAGE;

function getTodo(id) {
    return db('query', {
        TableName: DB_PREFIX + 'todos',
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeValues: {
            ':id': id
        },
        ExpressionAttributeNames: {
            '#id': 'id'
        }
    });
}

function getAllTodos() {
    return db('scan', {
        TableName: DB_PREFIX + 'todos'
    });
}

function createItem(data) {
    return db('put', {
        TableName: DB_PREFIX + 'todos',
        Item: {
            "id": data.id,
            "task": data.task,
            "isCompleted": data.isCompleted
        }
    });
}

function updateItem(data) {
    return db('update', {
        TableName: DB_PREFIX + 'todos',
        Key: {
            id: data.id
        },
        UpdateExpression: 'set task = :task',
        ExpressionAttributeValues: {
            ':task': data.task
        }
    });
}

function updateStatus(data) {
    return db('update', {
        TableName: DB_PREFIX + 'todos',
        Key: {
            id: data.id
        },
        UpdateExpression: 'set isCompleted = :isCompleted',
        ExpressionAttributeValues: {
            ':isCompleted': data.isCompleted
        }
    });
}

function deleteItem(params) {
    return db('delete', {
        TableName: DB_PREFIX + 'todos',
        Key: {
            id: params.id
        }
    });
}

module.exports = {
    getTodo: getTodo,
    getAllTodos: getAllTodos,
    updateItem: updateItem,
    updateStatus: updateStatus,
    createItem: createItem,
    deleteItem: deleteItem
};
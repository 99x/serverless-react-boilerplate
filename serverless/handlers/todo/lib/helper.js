'use strict';

var Promise = require('bluebird'),
    db = require('../../../database/dynamodb');

function getTodo(id) {
    return db('query', {
        TableName: 'todos',
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
        TableName: 'todos'
    });
}

function createItem(data) {
    return db('put', {
        TableName: 'todos',
        Item: {
            "id": data.id,
            "task": data.task,
            "isCompleted": data.isCompleted
        }
    });
}

function updateItem(data) {
    return db('update', {
        TableName: 'todos',
        Key: {
            id: data.id
        },
        UpdateExpression: 'set task = :task',
        ExpressionAttributeValues: {':task': data.task}
    });
}

function deleteItem(params){
    return db('delete', {
        TableName: 'todos',
        Key: {
            id: params.id
        }
    });
}

module.exports = {
    getTodo: getTodo,
    getAllTodos: getAllTodos,
    updateItem: updateItem,
    createItem: createItem,
    deleteItem: deleteItem
};

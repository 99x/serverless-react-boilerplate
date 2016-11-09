'use strict';

var Promise = require('bluebird'),
    db = require('../../../database/dynamodb'),
    tablename = process.env.TODOS_DB_NAME;

function getTodo(id) {
    return db('query', {
        TableName: tablename,
        KeyConditionExpression: '#id = :id',
        ExpressionAttributeValues: {
            ':id': id
        },
        ExpressionAttributeNames: {
            '#id': 'id'
        }
    });
}

function getAllTodos(event) {
    var params = {
        TableName: tablename,
        IndexName : 'UserIndex',
        KeyConditionExpression: '#userId = :userId',
        ExpressionAttributeValues: {
            ':userId': event.params.userId
        },
        ExpressionAttributeNames: {
            '#userId': 'userId'
        },
        ScanIndexForward: false
    };
    return db('query', params);
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function createTodo(event) {
    var data = event.data;
    data.id = guid();
    return db('put', {
        TableName: tablename,
        Item: data
    });
}

function updateTodo(event) {
    var data = event.data;
    return db('update', {
        TableName: tablename,
        Key: {
            id: data.id,
            userId: data.userId
        },
        UpdateExpression: 'set todoName = :todoName, todoDate = :todoDate',
        ExpressionAttributeValues: {':todoName': data.todoName, ':todoDate': data.todoDate}
    });
}

function updateStatus(event) {
    var data = event.data;
    return db('update', {
        TableName: tablename,
        Key: {
            id: data.id,
            userId: data.userId
        },
        UpdateExpression: 'set enabled = :enabled',
        ExpressionAttributeValues: {':enabled': data.enabled}
    });
}

function deleteTodo(event){
    return db('delete', {
        TableName: tablename,
        Key: {
            id: event.params.id,
            userId: event.params.userId
        }
    });
}

module.exports = {
    getTodo: getTodo,
    getAllTodos: getAllTodos,
    updateTodo: updateTodo,
    updateStatus: updateStatus,
    createTodo: createTodo,
    deleteTodo: deleteTodo
};

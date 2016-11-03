'use strict';

var Promise = require('bluebird'),
    db = require('../../../database/dynamodb'),
    tablename = process.env.ITEMS_DB_NAME;

function getItem(id) {
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

function getAllItems(event) {
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

function createItem(event) {
    var data = event.data;
    data.id = guid();
    return db('put', {
        TableName: tablename,
        Item: data
    });
}

function updateItem(event) {
    var data = event.data;
    return db('update', {
        TableName: tablename,
        Key: {
            id: data.id,
            userId: data.userId
        },
        UpdateExpression: 'set itemName = :itemName, itemDate = :itemDate',
        ExpressionAttributeValues: {':itemName': data.itemName, ':itemDate': data.itemDate}
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

function deleteItem(event){
    return db('delete', {
        TableName: tablename,
        Key: {
            id: event.params.id,
            userId: event.params.userId
        }
    });
}

module.exports = {
    getItem: getItem,
    getAllItems: getAllItems,
    updateItem: updateItem,
    updateStatus: updateStatus,
    createItem: createItem,
    deleteItem: deleteItem
};

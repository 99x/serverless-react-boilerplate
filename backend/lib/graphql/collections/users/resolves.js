'use strict';

const Promise = require('bluebird');
const uuid = require('uuid');
const bcryptjs = require('bcryptjs');
const db = require('../../../dynamodb');
const authenticate = require('../../../auth').authenticate;
const decode = require('../../../auth').decode;
const gravatar = require('gravatar');
const _ = require('lodash');

const stage = process.env.SERVERLESS_STAGE || 'dev';
const projectName = process.env.SERVERLESS_PROJECT || 'boilerplate';
const usersTable = projectName + '-users-' + stage;

module.exports = {
    signUp(user) {
        user.id = uuid.v1();
        user.password = bcryptjs.hashSync(user.password, 10);
        user.createdAt = String(Date.now());
        user.updatedAt = String(Date.now());

        let putItem = db('put', {
            TableName: usersTable,
            Item: user
        });

        return putItem.then(() => user);
    },

    signIn(user) {
        const email = user.email;
        const password = user.password;

        return db('query', {
            TableName: usersTable,
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ProjectionExpression: 'id, username, email, password, createdAt, updatedAt',
            ExpressionAttributeValues: {
                ':email': email
            }
        }).then(result => {
            const Item = result.Items[0];
            if (!Item) return Promise.reject('User not found');

            let match = bcryptjs.compareSync(password, Item.password);
            if (!match) return Promise.reject('invalid password');

            delete Item.password;

            Item.jwt = authenticate(Item);
            Item.gravatar = gravatar.url(Item.email, {
                s: '100',
                r: 'x',
                d: 'retro'
            }, true);

            return Item;
        });
    },

    getAll(jwt) {
        let id = decode(jwt).id;
        return db('get', {
            TableName: usersTable,
            Key: {
                id
            },
            ProjectionExpression: 'id'
        }).then(result => {
            const Item = result.Item;
            if (!Item) return Promise.reject('Invalid Token');

            return db('scan', {
                TableName: usersTable,
                ProjectionExpression: 'id, username, email'
            }).then(result => {
                return _.map(result.Items, function(item) {
                    return _.assign({}, item, {gravatar: gravatar.url(item.email, {
                        s: '100',
                        r: 'x',
                        d: 'retro'
                    }, true)});
                });
            });
        });

    },

    get(id) {
        return db('get', {
            TableName: usersTable,
            Key: {
                id
            },
            ProjectionExpression: 'id, username, email, createdAt, updatedAt'
        }).then(result => {
            const Item = result.Item;
            if (!Item) return Promise.reject('User not found');

            Item.gravatar = gravatar.url(Item.email, {
                s: '100',
                r: 'x',
                d: 'retro'
            }, true);

            return Item;
        });
    },

    updateCurrentUser(user) {
        let userId = decode(user.jwt).id;

        return db('update', {
            TableName: usersTable,
            Key: {
                id: userId
            },
            UpdateExpression: 'SET email = :email, username = :username, password = :password, updatedAt = :updatedAt',
            ExpressionAttributeValues: {
                ':email': user.email,
                ':username': user.username,
                ':password': bcryptjs.hashSync(user.password, 10),
                ':updatedAt': String(Date.now())
            },
            ReturnValues: 'ALL_NEW'
        }).then(result => {
            return result.Attributes;
        })
    },

    deleteCurrentUser(user) {
        let userId = decode(user.jwt).id;

        return db('delete', {
            TableName: usersTable,
            Key: {
                id: userId
            },
            ReturnValues: 'ALL_OLD'
        }).then(result => {
            return result.Attributes;
        });
    }
};

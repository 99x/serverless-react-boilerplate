'use strict';

var helper = require('./helper'),
    response = require('../../response');

module.exports.create = (event, cb) => {
    helper.createItem(event.data).then(result => {
        cb(null, response.create(201, {}));
    }).catch(err => {
        cb(null, response.create(500, {
            err: err
        }));
    })
};

module.exports.update = (event, cb) => {
    helper.updateItem(event.data).then(result => {
        cb(null, response.create(200, {}));
    }).catch(err => {
        cb(null, response.create(500, {
            err: err
        }));
    })
};

module.exports.status = (event, cb) => {
    helper.updateStatus(event.data).then(result => {
        cb(null, response.create(200, {}));
    }).catch(err => {
        cb(null, response.create(500, {
            err: err
        }));
    })
};

module.exports.getAll = (event, cb) => {
    helper.getAllTodos().then(todos => {
        cb(null, response.create(200, {
            result: todos
        }));
    }).catch(err => {
        cb(null, response.create(500, {
            err: err
        }));
    });
};

module.exports.delete = (event, cb) => {
    helper.deleteItem(event.params).then(result => {
        cb(null, response.create(200, {}));
    }).catch(err => {
        cb(null, response.create(500, {
            err: err
        }));
    })
};
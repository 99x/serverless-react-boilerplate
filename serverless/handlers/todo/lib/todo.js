'use strict';

var helper = require('./helper');

module.exports.create = (data, context) => {
    helper.createItem(data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.update = (data, context) => {
    helper.updateItem(data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.status = (data, context) => {
    helper.updateStatus(data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.getAll = (params, context) => {
    helper.getAllTodos().then(todos => {
        context.succeed({
            result: todos
        });
    }).catch(err => {
        context.fail("Error: " + err);
    });
};

module.exports.delete = (params, context) => {
    helper.deleteItem(params).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

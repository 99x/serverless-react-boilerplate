'use strict';

var helper = require('./helper');

module.exports.create = (event, context) => {
    helper.createItem(event.data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.update = (event, context) => {
    helper.updateItem(event.data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.status = (event, context) => {
    helper.updateStatus(event.data).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.getAll = (event, context) => {
    helper.getAllTodos().then(todos => {
        context.succeed({
            result: todos
        });
    }).catch(err => {
        context.fail("Error: " + err);
    });
};

module.exports.delete = (event, context) => {
    helper.deleteItem(event.params).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

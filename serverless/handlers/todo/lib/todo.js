'use strict';

var helper = require('./helper');

module.exports.create = (event, context) => {
    helper.createTodo(event).then(result => {
        context.succeed(event.data);
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.update = (event, context) => {
    helper.updateTodo(event).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.status = (event, context) => {
    helper.updateStatus(event).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.getAll = (event, context) => {
    helper.getAllTodos(event).then(todos => {
        context.succeed({
            result: todos
        });
    }).catch(err => {
        context.fail("Error: " + err);
    });
};

module.exports.delete = (event, context) => {
    helper.deleteTodo(event).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};
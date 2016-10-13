'use strict';

var todo = require('./lib/todo');

module.exports.todo = function(event, context, cb) {
    var params = JSON.parse(event.params || "{}"),
        path = event.path,
        data = event.data;

    switch (path) {
        case '/todos':
            todo.create(data, context);
            break;
        case '/todos/update':
            todo.update(data, context);
            break;
        case '/todos/status':
            todo.status(data, context);
            break;
        case '/todos/getAll':
            todo.getAll(params, context);
            break;
        case '/todos/delete/{id}':
            todo.delete(params, context);
            break;
        default:
            context.fail('Invalid api call');
    }
};

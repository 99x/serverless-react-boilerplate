'use strict';

var todo = require('./lib/todo');

module.exports.todo = (event, context, cb) => {
    var current = JSON.parse(decodeURIComponent(event.current || "{}")),
        data = JSON.parse(event.data),
        params = JSON.parse(event.params || "{}"),
        path = event.path;

    switch (path) {
        case '/todos':
            todo.create(current, data, context);
            break;
        case '/todos/{id}':
            todo.get(current, data, context);
            break;
        case '/todos/getAll':
            todo.getAll(current, data, context);
            break;
        case 'todos/delete/{id}':
            todo.delete(current, params, context);
            break;
        default:
            context.fail('Invalid api call');
    }
};

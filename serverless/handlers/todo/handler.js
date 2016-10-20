'use strict';

var todo = require('./lib/todo'),
    parser = require('../parser');

module.exports.todo = (event, context, cb) => {
    var event = parser.parseEvent(event),
        path = event.path;

    switch (path) {
        case '/todos':
            todo.create(event, context);
            break;
        case '/todos/update':
            todo.update(event, context);
            break;
        case '/todos/status':
            todo.status(event, context);
            break;
        case '/todos/getAll':
            todo.getAll(event, context);
            break;
        case '/todos/delete/{id}':
            todo.delete(event, context);
            break;
        default:
            context.fail('Invalid api call');
    }
};

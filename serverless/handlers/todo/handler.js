'use strict';

var todo = require('./lib/todo'),
    parser = require('../parser'),
    response = require('../response');

module.exports.todo = (event, context, cb) => {
    var event = parser.parseEvent(event),
        path = event.path;

    switch (path) {
        case '/todos':
            todo.create(event, cb);
            break;
        case '/todos/update':
            todo.update(event, cb);
            break;
        case '/todos/status':
            todo.status(event, cb);
            break;
        case '/todos/getAll':
            todo.getAll(event, cb);
            break;
        case '/todos/delete/{id}':
            todo.delete(event, cb);
            break;
        default:
            cb(null, response.create(404, {"Error": "API Route: "+ path + " not found!"}));
    }
};
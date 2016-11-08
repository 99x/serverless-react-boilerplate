'use strict';

// Config
require('dotenv').config();

const todos = require('./lib/todo');

module.exports.todo = function (event, context) {
  var path = event.path;
  event.params = JSON.parse(event.params || "{}");

  switch (path) {
        // '/todos/{userId}/register' is called on login by the
        // serverless-authentication-boilerplate callback method before returning.
        // This ensures that the client cannot change the userId authorized by the login.
    case '/todos/{userId}/register':
      context.succeed('Registered API usage');
      break;
    case '/todos/{userId}/getAll':
      todos.getAll(event, context);
      break;
    case '/todos/{userId}/create':
      todos.create(event, context);
      break;
    case '/todos/{userId}/update':
      todos.update(event, context);
      break;
    case '/todos/{userId}/status':
      todos.status(event, context);
      break;
    case '/todos/{userId}/delete/{id}':
      todos.delete(event, context);
      break;
    default:
      context.fail('Invalid api call');
  }
};

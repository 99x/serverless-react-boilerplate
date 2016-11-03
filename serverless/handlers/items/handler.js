'use strict';

// Config
require('dotenv').config();

const items = require('./lib/items');

module.exports.items = function (event, context) {
  var path = event.path;
  event.params = JSON.parse(event.params || "{}");

  switch (path) {
        // '/items/{userId}/register' is called on login by the
        // serverless-authentication-boilerplate callback method before returning.
        // This ensures that the client cannot change the userId authorized by the login.
    case '/items/{userId}/register':
      context.succeed('Registered API usage');
      break;
    case '/items/{userId}/getAll':
      items.getAll(event, context);
      break;
    case '/items/{userId}/create':
      items.create(event, context);
      break;
    case '/items/{userId}/update':
      items.update(event, context);
      break;
    case '/items/{userId}/status':
      items.status(event, context);
      break;
    case '/items/{userId}/delete/{id}':
      items.delete(event, context);
      break;
    default:
      context.fail('Invalid api call');
  }
};

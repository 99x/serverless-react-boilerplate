"use strict";

var helper = require("./helper"),
  response = require("./response");

module.exports.getAllTodos = (event, cb) => {
  helper
    .getAllTodos()
    .then(todos => {
      cb(
        null,
        response.create(200, {
          result: todos
        })
      );
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err
        })
      );
    });
};

module.exports.createTodo = (event, cb) => {
  helper
    .createTodo(JSON.parse(event.body))
    .then(result => {
      cb(null, response.create(201, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err
        })
      );
    });
};

module.exports.updateTodo = (event, cb) => {
  helper
    .updateTodo(JSON.parse(event.body))
    .then(result => {
      cb(null, response.create(200, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err
        })
      );
    });
};

module.exports.updateTodoStatus = (event, cb) => {
  helper
    .updateTodoStatus(JSON.parse(event.body))
    .then(result => {
      cb(null, response.create(200, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err
        })
      );
    });
};

module.exports.deleteTodo = (event, cb) => {
  helper
    .deleteTodo(event.pathParameters)
    .then(result => {
      cb(null, response.create(200, {}));
    })
    .catch(err => {
      cb(
        null,
        response.create(500, {
          err: err
        })
      );
    });
};

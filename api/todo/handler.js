'use strict';

let todo = require('./lib/todo');

module.exports.getAllTodos = (event, context, callback) => {
  todo.getAllTodos(event, callback);
};

module.exports.createTodo = (event, context, callback) => {
  todo.createTodo(event, callback);
};

module.exports.updateTodo = (event, context, callback) => {
  todo.updateTodo(event, callback);
};

module.exports.updateTodoStatus = (event, context, callback) => {
  todo.updateTodoStatus(event, callback);
};

module.exports.deleteTodo = (event, context, callback) => {
  todo.deleteTodo(event, callback);
};
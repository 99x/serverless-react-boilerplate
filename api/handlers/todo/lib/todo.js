'use strict';

var helper = require('./helper');

module.exports.create = (current, data, context) => {
    // create or update todo
    // return the updated todo
    context.succeed({
        status: "create success"
    });

};

module.exports.get = (current, data, context) => {
    // get the todo by id
    // return the todo
    context.succeed({
        status: "get success"
    });
};

module.exports.getAll = (current, data, context) => {
    var email = current.email;
    helper.getAllTodos(email).then(todos => {
        context.succeed({
            result: todos
        });
    }).catch(err => {
        context.fail("Error: " + err);
    });

    // get all the todos by email
};

module.exports.delete = (current, params, context) => {
    // delete todo by id
    // return deleted todo
    context.succeed({
        status: "delete success"
    });
};

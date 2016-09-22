'use strict';

var helper = require('./helper');

module.exports.create = (current, data, context) => {
    // handle authorization
    // create or update todo
    // return the updated todo
    context.succeed({
        status: "create success"
    });

};

module.exports.get = (current, data, context) => {
    // handle authorization
    // get the todo by id
    // return the todo
    context.succeed({
        status: "get success"
    });
};

module.exports.delete = (current, params, context) => {
    // handle authorization
    // delete todo by id
    // return deleted todo
    context.succeed({
        status: "delete success"
    });
};

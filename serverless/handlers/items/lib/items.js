'use strict';

var helper = require('./helper');

module.exports.create = (event, context) => {
    helper.createItem(event).then(result => {
        context.succeed(event.data);
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.update = (event, context) => {
    helper.updateItem(event).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.status = (event, context) => {
    helper.updateStatus(event).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};

module.exports.getAll = (event, context) => {
    helper.getAllItems(event).then(items => {
        context.succeed({
            result: items
        });
    }).catch(err => {
        context.fail("Error: " + err);
    });
};

module.exports.delete = (event, context) => {
    helper.deleteItem(event).then(result => {
        context.succeed({});
    }).catch(err => {
        context.fail("Error: " + err);
    })
};
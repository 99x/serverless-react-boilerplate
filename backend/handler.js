'use strict';

const graphql = require('./lib/graphql');

module.exports.handler = (event, context, callback) => {
    graphql(event.query)
        .then((response) => callback(null, response))
        .catch((error) => callback(error));
};

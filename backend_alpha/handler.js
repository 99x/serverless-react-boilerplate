'use strict';

const graphql = require('./lib/graphql');

module.exports.handler = (event, context, cb) => cb(null,
  { message: 'Go Serverless v1.0! Your function executed successfully!', event }
);

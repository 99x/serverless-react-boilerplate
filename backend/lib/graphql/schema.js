'use strict';

const GraphQL = require('graphql');
const GraphQLObjectType = GraphQL.GraphQLObjectType;
const GraphQLSchema = GraphQL.GraphQLSchema;
const _ = require('lodash');
const mutations = {};
const queries = {};

const Queries = new GraphQLObjectType({
    name: 'Root',
    description: 'Root of the Schema',
    fields: queries
});

const collections = [
    'users'
];

// load collections queries and mutations
collections.forEach(name => {
    _.assign(queries, require(`./collections/${name}/queries`));
    _.assign(mutations, require(`./collections/${name}/mutations`));
});

const Mutations = new GraphQLObjectType({
    name: 'Mutations',
    fields: mutations
});

module.exports = new GraphQLSchema({
    query: Queries,
    mutation: Mutations
});

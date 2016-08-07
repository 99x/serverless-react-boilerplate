'use strict';

const GraphQLObjectType = require('graphql').GraphQLObjectType;
const GraphQLString = require('graphql').GraphQLString;

module.exports = new GraphQLObjectType({
  name: 'User',
  description: 'User',
  fields: () => ({
    id: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    jwt: { type: GraphQLString },
    gravatar: { type: GraphQLString }
  })
});

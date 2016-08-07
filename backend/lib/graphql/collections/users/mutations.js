'use strict';

const GraphQLString = require('graphql').GraphQLString;
const GraphQLNonNull = require('graphql').GraphQLNonNull;

const UserType = require('./type');
const validate = require('./validate');
const resolves = require('./resolves');

module.exports = {
  signUp: {
    type: UserType,
    description: 'Sign up',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.signUp(args));
    }
  },
  signIn: {
    type: UserType,
    description: 'Sign in',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.signIn(args));
    }
  },
  updateCurrentUser: {
    type: UserType,
    description: 'Updates the current user',
    args: {
      email: { type: new GraphQLNonNull(GraphQLString) },
      username: { type: new GraphQLNonNull(GraphQLString) },
      password: { type: new GraphQLNonNull(GraphQLString) },
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.updateCurrentUser(args));
    }
  },
  deleteCurrentUser: {
    type: UserType,
    description: 'Deletes the current user',
    args: {
      jwt: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve(source, args) {
      return validate(args).then(() => resolves.deleteCurrentUser(args));
    }
  }
};

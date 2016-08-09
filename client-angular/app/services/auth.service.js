(function() {
    'use strict';

    angular
        .module('clientAngular')
        .factory('AuthService', authService);

    authService.$inject = ["API_URL", "GraphQL"];

    function authService(API_URL, GraphQL) {
        var graphQL = new GraphQL(API_URL);

        var queries = {
            signup: function(user) {
                return 'mutation signup {user: signUp(email:"' + user.email + '", username:"' + user.username + '", password:"' + user.password + '"){id username email}}';
            },
            login: function(user) {
                return 'mutation login {user: signIn(email:"' + user.email + '", password:"' + user.password + '"){id username email jwt gravatar}}';
            }
        };

        var sendQuery = function(query) {
            return new Promise(function(resolve, reject) {
                graphQL.send(query)
                    .then(function(data) {
                        resolve(data);
                    }, function(err) {
                        reject(err);
                    });
            });
        };

        var register = function(user) {
            return sendQuery(queries.signup(user));
        };

        var login = function(user) {
            return sendQuery(queries.login(user));
        };

        return {
            register: register,
            login: login
        }
    }
})();

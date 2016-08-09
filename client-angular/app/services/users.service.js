(function() {
    'use strict';

    angular
        .module('clientAngular')
        .factory('UserService', userService);

    userService.$inject = ["API_URL", "GraphQL"];

    function userService(API_URL, GraphQL) {
        var graphQL = new GraphQL(API_URL);

        var queries = {
            getAllUsers: function(jwt) {
                return 'query getAllUsers {users(jwt:"' + jwt + '"){username email gravatar}}';
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

        var getAllUsers = function(jwt) {
            return sendQuery(queries.getAllUsers(jwt));
        };

        return {
            getAllUsers: getAllUsers
        }
    }
})();

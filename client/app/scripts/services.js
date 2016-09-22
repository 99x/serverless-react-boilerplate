'use strict';

angular.module('serverlessClientApp')
    .factory('Main', ['$http', '$localStorage', '$rootScope', function($http, $localStorage, $rootScope) {
        var baseUrl = "API_GATEWAY_STAGE_URL";
        return {
            signup: function(data, success, error) {
                $http.post(baseUrl + '/signup', data).success(success).error(error)
            },
            login: function(data, success, error) {
                $http.post(baseUrl + '/login', data).success(success).error(error)
            },
            me: function(success, error) {
                $http.get(baseUrl + '/todos').success(success).error(error)
            },
            logout: function(success) {
                delete $rootScope.user;
                delete $localStorage.token;
                success();
            }
        };
    }]);

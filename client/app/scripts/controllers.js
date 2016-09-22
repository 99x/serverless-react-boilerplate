'use strict';

/* Controllers */

angular.module('serverlessClientApp')
    .controller('HomeCtrl', ['$rootScope', '$scope', '$location', '$localStorage', '$window', 'jwtHelper', 'Main', function($rootScope, $scope, $location, $localStorage, $window, jwtHelper, Main) {

        $scope.login = function() {
            var formData = {
                email: $scope.email,
                password: $scope.password
            };

            Main.login(formData, function(res) {
                if (typeof(res.token) === 'string') {
                    $scope.setToken(res.token);
                    $rootScope.user = jwtHelper.decodeToken(res.token);
                    $window.location = "#/me";
                } else {
                    $rootScope.error = 'Failed to Login';
                }
            }, function() {
                $rootScope.error = 'Failed to Login';
            });
        };

        $scope.signup = function() {
            var formData = {
                name: $scope.name,
                email: $scope.email,
                password: $scope.password
            };

            Main.signup(formData, function(res) {
                if (res === '"Success"') {
                    $window.location = "#/login";
                } else {
                    $rootScope.error = 'Failed to signup';
                    console.log(res);
                    alert($rootScope.error);
                }
            }, function() {
                $rootScope.error = 'Failed to signup';
                alert($rootScope.error);
            });
        };

        $scope.me = function() {
            Main.me(function(res) {
                $scope.myDetails = res;
            }, function() {
                $rootScope.error = 'Failed to fetch details';
            });
        };

        $scope.logout = function() {
            Main.logout(function() {
                $window.location = "/";
            }, function() {
                $rootScope.error = 'Failed to logout!';
            });
        };

        $scope.setToken = function(token) {
            $localStorage.token = token;
            $rootScope.isToken = true;
        };

        $scope.unsetToken = function() {
            $localStorage.token = null;
            $rootScope.isToken = false;
        };

    }])

.controller('MeCtrl', ['$rootScope', '$scope', '$location', 'Main', function($rootScope, $scope, $location, Main) {
    $scope.test = "Hello "+ $rootScope.user.name + ", Welcome!";
    // Main.me(function(res) {
    //     $scope.myDetails = res;
    // }, function() {
    //     $rootScope.error = 'Failed to fetch details';
    // });
}]);

(function() {
    'use strict';

    angular
        .module('clientAngular')
        .controller('signupController', signupController);

    signupController.$inject = ['$scope', '$state', 'AuthService'];

    function signupController($scope, $state, AuthService) {
        var vm = this;
        vm.dataLoading = false;

        vm.user = {
            email: null,
            username: null,
            password: null
        };

        vm.register = function() {
            vm.dataLoading = true;

            AuthService.register(vm.user)
                .then(function(data) {
                        $state.go('login');
                    },
                    function(err) {
                        throw err;
                    })
                .finally(function() {
                    $scope.$apply(function() {
                        vm.dataLoading = false;
                    });
                });
        };
    };
})();

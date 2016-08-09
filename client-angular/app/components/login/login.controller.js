(function() {
    'use strict';

    angular
        .module('clientAngular')
        .controller('loginController', loginController);

    loginController.$inject = ['$rootScope', '$scope', 'store', '$state', 'AuthService'];

    function loginController($rootScope, $scope, store, $state, AuthService) {
        var vm = this;
        vm.dataLoading = false;
        vm.user = {
            email: null,
            password: null
        };

        vm.login = function() {
            vm.dataLoading = true;

            AuthService.login(vm.user)
                .then(function(data) {
                        store.set('token', data.user.jwt);
                        $rootScope.isLoggedin = true;
                        $state.go('profile');
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

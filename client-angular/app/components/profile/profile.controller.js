(function() {
    'use strict';

    angular
        .module('clientAngular')
        .controller('profileController', profileController);

    profileController.$inject = ['$rootScope', '$scope', '$state', 'store', 'UserService'];

    function profileController($rootScope, $scope, $state, store, UserService) {
        var vm = this;
        vm.friends = [];
        vm.init = function() {
            UserService.getAllUsers(store.get('token'))
                .then(function(data) {
                        $scope.$apply(function(){
                            vm.friends = data.users;
                        });
                    },
                    function(err) {
                        store.remove('token');
                        $rootScope.isLoggedin = false;
                        $state.go('login');
                    });
        }();
    };
})();

(function() {
    'use strict';

    angular
        .module('clientAngular')
        .controller('loginController', loginController);

    loginController.$inject = ['$http', "store"];

    function loginController($http, store) {
        var vm = this;
        vm.login = function(){
            // once login is successfull
            store.set('token', token);
            $location.path('/home');
        };
        vm.logout = function(){
            store.remove('token');
            $location.path('/home');
        };
    };
})();

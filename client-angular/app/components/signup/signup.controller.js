(function() {
    'use strict';

    angular
        .module('clientAngular')
        .controller('signupController', signupController);

    signupController.$inject = ['$http'];

    function signupController($http) {
        var vm = this;
        vm.message = 'Signup';
    };
})();

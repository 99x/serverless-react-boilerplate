(function() {
    'use strict';

    angular
        .module('clientAngular')
        .controller('profileController', profileController);

    profileController.$inject = ['$http'];

    function profileController($http) {
        console.log("init profile.");
        var vm = this;
        vm.message = 'Hello!!!';
    };
})();

(function() {
    'use strict';

    angular
        .module('clientAngular')
        .directive('toolbar', toolbar);

    function toolbar() {
        return {
            templateUrl: 'components/toolbar/toolbar.template.html',
            controller: toolbarController,
            controllerAs: 'toolbarVm'
        }
    }

    toolbarController.$inject = ["$rootScope", "store", "$state"];

    function toolbarController($rootScope, store, $state) {
        var vm = this;
        vm.logout = function() {
            store.remove('token');
            $rootScope.isLoggedin = false;
            $state.go('login');
        }
    }
}());

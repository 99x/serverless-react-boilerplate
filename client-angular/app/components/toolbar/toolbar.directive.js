(function() {
    'use strict';

    angular
        .module('clientAngular')
        .directive('toolbar', toolbar);

    function toolbar() {
        return {
            templateUrl: 'components/toolbar/toolbar.template.html',
            controller: toolbarController,
            controllerAs: 'toolbar'
        }
    }

    toolbarController.$inject = ["$location"];

    function toolbarController(store, $location) {
        var vm = this;
    }
}());

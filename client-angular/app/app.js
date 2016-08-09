'use strict';
angular
    .module('clientAngular', ['angular-storage', 'angular-jwt', 'ngMaterial', 'ui.router'])
    .config(function($provide, $urlRouterProvider, $stateProvider, $httpProvider, jwtInterceptorProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'components/home/home.template.html'
            })
            .state('profile', {
                url: '/profile',
                templateUrl: 'components/profile/profile.template.html',
                controller: 'profileController as profileVm'
            })
            .state('login', {
                url: '/login',
                templateUrl: 'components/login/login.template.html',
                controller: 'loginController as loginVm'
            })
            .state('signup', {
                url: '/signup',
                templateUrl: 'components/signup/signup.template.html',
                controller: 'signupController as signupVm'
            })

    })
    .run(["$rootScope", "store", function($rootScope, store) {
        $rootScope.isLoggedin = !!store.get('token');
    }]);

(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl : './app/partials/home.html',
            access : {restricted : false}
        })
        .when('/project', {
            templateUrl : './app/partials/project.html',
            restricted : true
        })
        .when('/login', {
            templateUrl : './app/partials/login.html',
            controller : 'loginController'
        })
        .when('/logout', {
            controller : 'logoutController'
        })
        .when('/register', {
            templateUrl : './app/partials/register.html',
            controller : 'registerController'
        })
        .otherwise({redirectTo: '/'});
    }]);

    angular.module('app').run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            if(next.access.restricted && AuthService.isLoggedIn() === false) {
                $location.path('/login');
            }
        })
    })

})();

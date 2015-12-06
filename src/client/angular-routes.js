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
            restricted : true,
            access : {restricted : true}
        })
        .when('/login', {
            templateUrl : './app/partials/login.html',
            controller : 'loginController',
            access : {restricted : false}
        })
        .when('/logout', {
            controller : 'logoutController',
            access : {restricted : true}
        })
        .when('/register', {
            templateUrl : './app/partials/register.html',
            controller : 'registerController',
            access : {restricted : false}
        })
        .when('/newProject', {
            templateUrl : './app/partials/newProject.html',
            controller : 'navbarController',
            access : {restricted : true}
        })
        .when('/myProjects', {
            templateUrl : './app/partials/myProjects.html',
            access : {restricted : true}
        })
        .otherwise({redirectTo: '/'});
    }]);

    angular.module('app').run(function($rootScope, $location, $route, AuthService) {
        $rootScope.$on('$routeChangeStart', function(event, next, current) {
            console.log(AuthService.getUser());
            if (next.access.restricted && AuthService.isLoggedIn() === false) {
                $location.path('/login');
            }
        })
    })

})();

(function() {
    'use strict';

    angular.module('app').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
        .when('/', {
            templateUrl : './app/partials/home.html'
        })
        .otherwise({redirectTo: '/'});
    }]);

})();

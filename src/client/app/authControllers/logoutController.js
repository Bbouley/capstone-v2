angular.module('app').controller('logoutController',
    ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.logout = function() {
            console.log('Previous User Status : ' + AuthService.getUserStatus());

            AuthService.logout()
            .then(function() {
                console.log('Current User Status : ' + AuthService.getUserStatus());
                $location.path('/login');
            });
        };

    }]);

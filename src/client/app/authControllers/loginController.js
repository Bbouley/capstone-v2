angular.module('app').controller('loginController',
    ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.login = function() {
            $scope.error = false;
            $scope.disabled = true;
            console.log('Previous User Status : ' + AuthService.getUserStatus());

            AuthService.login($scope.loginForm.username, $scope.loginForm.password)
            .then(function() {
                console.log('Current User Status : ' + AuthService.getUserStatus());
                $location.path('/');
                $scope.disabled = false;
                $scope.loginForm = {};
            })
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = 'Invalid Username and/or Password';
                $scope.diabled = false;
                $scope.loginForm = {};
            });
        }

    }])

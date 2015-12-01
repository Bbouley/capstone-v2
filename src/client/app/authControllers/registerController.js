angular.module('app').controller('registerController',
    ['$scope', '$location', 'AuthService',
    function($scope, $location, AuthService) {

        $scope.register = function() {
            $scope.error = false;
            $scope.disabled = true;

            AuthService.register($scope.registerForm.username, $scope.registerForm.password, $scope.registerForm.email)
            .then(function() {
                $location.path('/login');
                $scope.disabled = false;
                $scope.registerForm = {};
            })
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = 'Something didn\'t work. Shame.'
                $scope.disabled = false;
                $scope.registerForm = {};
            })
        }
    }])

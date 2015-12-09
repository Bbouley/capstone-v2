angular.module('app').controller('newProjectController', ['$scope', '$rootScope', '$timeout','appFactory', 'AuthService', function($scope, $rootScope, $timeout, appFactory, AuthService) {

    $scope.error = false;
    $scope.success = false;
    $scope.message = null;

    function successFunction() {
        $scope.success = true;
        $scope.message = 'Project Successfully Added!!!'
        $timeout(function() {
            $scope.success = false;
            $scope.message = null;
        }, 3000)
    }

    function errorFunction() {
        $scope.error = true;
        $scope.message = 'Something went wrong...'
        $timeout(function() {
            $scope.error = false;
            $scope.message = null;
        }, 3000)
    }

    $scope.submitProject = function() {
        var user = $rootScope.user;
        var id = (user.userId).replace(/"/g,"");;
        var url = '/api/' + id + '/projects';
        var payload = $scope.newProject;
        appFactory.post(url, payload)
        .then(function(res) {
            if (res.status === 200) {
                $scope.newProject = {};
                successFunction();
            } else {
                $scope.newProject = {};
                errorFunction();
            }
        });
    };

}]);



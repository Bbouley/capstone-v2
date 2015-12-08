angular.module('app').controller('newProjectController', ['$scope', '$rootScope', '$timeout','appFactory', 'AuthService', function($scope, $rootScope, $timeout, appFactory, AuthService) {

    $scope.error = false;
    $scope.success = false;
    $scope.message = null;

    $scope.successFunction = function() {
        $scope.success = true;
        $timeout(function() {
            $scope.success = false;
        }, 3000)
    }

    $scope.errorFunction = function() {
        $scope.error = true;
        $timeout(function() {
            $scope.error = false;
        }, 3000)
    }

    $scope.submitProject = function() {
        var user = $rootScope.user;
        var id = (user.userId).replace(/"/g,"");;
        console.log(id);
        var url = '/api/' + id + '/projects';
        console.log(url);
        var payload = $scope.newProject;
        appFactory.post(url, payload)
        .then(function(res) {
            if (res.status === 200) {
                $scope.newProject = {};
                $scope.message = 'Project Successfully Added!!!'
            } else {
                $scope.message = 'Something went wrong...'
            }
        });
    };

}]);

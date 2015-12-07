angular.module('app').controller('newProjectController', ['$scope', '$rootScope','appFactory', 'AuthService', function($scope, $rootScope, appFactory, AuthService) {
    // var user = AuthService.getUser();
    $scope.submitProject = function() {
        var user = $rootScope.user;
        var url = '/api/' + user.userId + '/projects';
        var payload = $scope.newProject;
        appFactory.post(url, payload)
        .then(function(response) {
            console.log('server response' + response);
        });
    };
}]);

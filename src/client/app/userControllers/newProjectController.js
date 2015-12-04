angular.module('app').controller('newProjectController', ['$scope', 'appFactory', function($scope, appFactory) {
    $scope.submitProject = function() {
        console.log('Form Is Valid!!');
    };
}])

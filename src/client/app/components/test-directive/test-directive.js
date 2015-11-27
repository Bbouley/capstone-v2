var testDirective = angular.module('app.test-directive', []);

testDirective.directive('testDirective', function() {

    return {
        restrict   : 'EA',
        transclude : false,
        templateUrl : '/app/components/test-directive/test-directive.html',
        scope : {},
        controllerAs : 'vm',
        controller : testDirectiveController,
        bindToController : true,
        link : function(scope) {
        }
    };

    function testDirectiveController($scope) {
        var vm = this;
        vm.people = ['me', 'myself', 'I'];
    }

});



/* jshint -W030, -W117 */
describe('creating the test-directive', function() {
    var element,
        scope,
        vm;

    beforeEach(module('app.test-directive'));

    beforeEach(inject(function($compile, $rootScope, $templateCache) {
        element = angular.element('<test-directive></test-directive>');

        $templateCache.put('/app/components/test-directive/test-directive.html', '');

        scope = $rootScope.$new();
        element = $compile(element)(scope);
        scope.$digest(element);

        vm = element.controller('test-directive');
    }));


    it('the element should be created', function() {
        console.log(element);
        expect(element).to.be.defined;
        expect(vm).to.be.defined;
    });

    it('should have access to the controller', function() {
        expect(vm.people).to.deep.equal(['me', 'myself', 'I']);
    });

});

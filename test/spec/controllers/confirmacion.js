'use strict';

describe('Controller: ConfirmacionCtrl', function () {

  // load the controller's module
  beforeEach(module('escrutinioApp'));

  var ConfirmacionCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ConfirmacionCtrl = $controller('ConfirmacionCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ConfirmacionCtrl.awesomeThings.length).toBe(3);
  });
});

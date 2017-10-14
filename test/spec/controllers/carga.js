'use strict';

describe('Controller: CargaCtrl', function () {

  // load the controller's module
  beforeEach(module('escrutinioApp'));

  var CargaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CargaCtrl = $controller('CargaCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CargaCtrl.awesomeThings.length).toBe(3);
  });
});

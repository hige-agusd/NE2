'use strict';

describe('Controller: MesasCtrl', function () {

  // load the controller's module
  beforeEach(module('escrutinioApp'));

  var MesasCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MesasCtrl = $controller('MesasCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(MesasCtrl.awesomeThings.length).toBe(3);
  });
});

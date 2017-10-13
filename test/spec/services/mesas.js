'use strict';

describe('Service: Mesas', function () {

  // load the service's module
  beforeEach(module('escrutinioApp'));

  // instantiate service
  var Mesas;
  beforeEach(inject(function (_Mesas_) {
    Mesas = _Mesas_;
  }));

  it('should do something', function () {
    expect(!!Mesas).toBe(true);
  });

});

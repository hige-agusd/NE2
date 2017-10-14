'use strict';

describe('Service: Listas', function () {

  // load the service's module
  beforeEach(module('escrutinioApp'));

  // instantiate service
  var Listas;
  beforeEach(inject(function (_Listas_) {
    Listas = _Listas_;
  }));

  it('should do something', function () {
    expect(!!Listas).toBe(true);
  });

});

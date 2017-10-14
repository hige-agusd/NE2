'use strict';

describe('Service: Resultados', function () {

  // load the service's module
  beforeEach(module('escrutinioApp'));

  // instantiate service
  var Resultados;
  beforeEach(inject(function (_Resultados_) {
    Resultados = _Resultados_;
  }));

  it('should do something', function () {
    expect(!!Resultados).toBe(true);
  });

});

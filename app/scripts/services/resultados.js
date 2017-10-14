'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Resultados
 * @description
 * # Resultados
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('ResultadosSrv', [function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var resultados = [],
      self = {};
    
    self.isLoaded = function (mesa) {
      _.find( resultados, function(o) {
        return o.mesa == mesaActual;
      });
    };
    
    return self;
  }]);

'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Mesas
 * @description
 * # Mesas
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('MesasSrv', ['$q', 'SessionSrv', function ($q, SessionSrv) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var mesas,
      mesaActual,
      self = {};

    self.getMesas = function() {
      mesas = {
        circuito: 5,
        mesas: [5857, 5858]
      };
      return mesas;
    };

    self.setMesa = function(mesa) {
      mesaActual = mesa;
    };

    self.getMesa = function() {
      return mesaActual;
    };

    return self;
  }]);

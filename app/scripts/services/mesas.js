'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Mesas
 * @description
 * # Mesas
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('MesasSrv', ['$http', '$q', 'ConfigSrv', 'SessionSrv',
    function ($http, $q, ConfigSrv, SessionSrv) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var mesas,
      mesaActual,
      self = {};

    self.getMesas = function() {
      var deferred = $q.defer();
      var header = {"x-auth-token": SessionSrv.getToken()};
      $http.get(ConfigSrv.getBaseUrl() + 'fiscalApi/getMesas', {"headers": header}).then(
        function(response) {
          mesas = parseMesas(response.data);
          deferred.resolve(mesas);
        }, function(err) {
          deferred.reject(err);
        });
      //return mesas;
      return deferred.promise;
    };

    function parseMesas(mesas) {
      var retVal = {
        circuito: mesas[0].escuela,
        mesas: _.map(mesas, 'mesa')
      };
      return retVal
    }

    self.setMesa = function(mesa) {
      mesaActual = mesa;
    };

    self.getMesa = function() {
      return mesaActual;
    };

    return self;
  }]);

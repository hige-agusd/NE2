'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Listas
 * @description
 * # Listas
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('ListasSrv', ['$http', '$q', 'ConfigSrv', 'SessionSrv', function ($http, $q, ConfigSrv, SessionSrv) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var listas,
      self = {};

    self.getListas = function() {
      var deferred = $q.defer();
      if(listas) {
        deferred.resolve(_.clone(listas, true));
      } else {
        var header = {"x-auth-token": SessionSrv.getToken()};
        $http.get(ConfigSrv.getBaseUrl() + 'fiscalApi/getPartidos', {headers: header}).then(function(response) {
          listas = response.data;
          deferred.resolve(_.clone(listas, true));
          //deferred.resolve(listas);
        }, function(err) {
          deferred.reject(err);
        });
      }

      return deferred.promise;
    };

    self.getListaPorNumero = function(numeroLista) {
      return _.find(listas, function(o){
        return o.lista == numeroLista;
      });
    };

    return self;
  }]);

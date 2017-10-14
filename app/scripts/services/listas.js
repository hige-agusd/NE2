'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Listas
 * @description
 * # Listas
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('ListasSrv', ['$http', '$q', 'ConfigSrv', function ($http, $q, ConfigSrv) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var listas,
      self = {};

    self.getListas = function() {
      var deferred = $q.defer();
      if(listas) {
        deferred.resolve(listas);
      } else {
        $http.get(ConfigSrv.getBaseUrl() + 'getPartidos').then(function(response) {
          listas = response;
          deferred.resolve(listas);
        }, function(err) {
          deferred.reject(err);
        })
      }

      return deferred.promise;
    };

    return self;
  }]);

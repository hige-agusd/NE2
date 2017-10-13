'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Session
 * @description
 * # Session
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('SessionSrv', ['$http', '$q', 'ConfigSrv', function ($http, $q, ConfigSrv) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = {},
      authToken;

    self.login = function(params) {
      var deferred = $q.defer();
      $http.get(ConfigSrv.getBaseUrl() + params).then(function(response) {
        authToken = response.authToken;
        deferred.resolve(authToken);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    self.getToken = function() {
      return authToken;
    };

    return self;
  }]);

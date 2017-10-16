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
      authToken,
      user;

    self.login = function(params) {
      var data = {
        username: params.name,
        password: params.password
      };
      var deferred = $q.defer();
      $http.post(ConfigSrv.getBaseUrl() + 'api/login', data).then(function(response) {
        authToken = response.data.access_token;
        deferred.resolve(authToken);
      }, function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    self.getToken = function() {
      return authToken;
    };

    self.getUser = function() {
      return user;
    };

    return self;
  }]);

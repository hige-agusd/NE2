'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.config
 * @description
 * # config
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('ConfigSrv', ['$http', '$location', function ($http, $location) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var self = {
      map: {
        baseUrl: 'http://fct.hopto.org:8081/FiscalizacionNE/api/'
      }
    };
    
    function getConfig() {
      $http.get('./configs/config.json').success(function(configStr) {
        self.map.baseUrl = configStr;
      });
    }
    
    self.getBaseUrl = function() {
      return self.map.baseUrl;
    };

    return self;
  }]);

'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('MainCtrl', ['$location', '$timeout', 'ConfigSrv',
   function ($location, $timeout, ConfigSrv) {
    $timeout(function() {
      //$location.url('/login')
    },3000);
  }]);

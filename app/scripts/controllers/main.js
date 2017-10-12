'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('MainCtrl', ['$location', '$timeout',
   function ($location, $timeout) {
    $timeout(function() {
      $location.url('/login')
    },3000);
  }]);

'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('LoginCtrl', ['$location', '$scope', 'SessionSrv', function($location, $scope, SessionSrv) {
    $scope.errMsg = "";
    $scope.submit = function($event) {
      $scope.errMsg = "";
      SessionSrv.login($scope.user).then(function(response) {
        //go to mesas
        $location.url('/mesas');
      }, function (err) {
        $scope.errMsg = 'Usuario y/o contraseña incorrectos'

      })
    };
  }]);

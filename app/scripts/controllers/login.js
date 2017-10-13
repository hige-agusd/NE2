'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('LoginCtrl', ['$scope', 'SessionSrv', function($scope, SessionSrv) {
    $scope.errMsg = "";
    $scope.submit = function($event) {
      $scope.errMsg = "";
      SessionSrv.login($scope.user).then(function(response) {
        //go to mesas
      }, function (err) {
        $scope.errMsg = 'Usuario y/o contraseña incorrectos'

      })
    };
  }]);

'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:MesasCtrl
 * @description
 * # MesasCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('MesasCtrl', ['$location', '$scope', 'MesasSrv', function ($location, $scope, MesasSrv) {

    MesasSrv.getMesas().then(function(mesas) {
      $scope.mesas = mesas;
    }, function(err) {
      $location.url('/login');
    });

    $scope.setMesa = function(e, mesa) {
      MesasSrv.setMesa(mesa);
      $location.url('/carga');
    };

  }]);

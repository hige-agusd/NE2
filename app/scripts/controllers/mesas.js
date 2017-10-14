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
    
    $scope.mesas = MesasSrv.getMesas();
    
    $scope.setMesa = function(e, mesa) {
      MesasSrv.setMesa(mesa);
      $location.url('/carga');
    };
    
  }]);

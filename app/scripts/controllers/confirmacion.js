'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:ConfirmacionCtrl
 * @description
 * # ConfirmacionCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('ConfirmacionCtrl', ['$location', '$scope', 'ListasSrv', 'MesasSrv', 'ResultadosSrv',
    function ($location, $scope, ListasSrv, MesasSrv, ResultadosSrv) {

      $scope.resultados = [];
      var resultados = ResultadosSrv.getDatosMesa(MesasSrv.getMesa());
      if(resultados.votos.length) {
        _.each(resultados.votos, function(resultadoLista, index) {
          resultadoLista.par = (index % 2 == 0);
          resultadoLista['nombre'] = ListasSrv.getListaPorNumero(resultadoLista.lista).nombre;
          $scope.resultados.push(resultadoLista);
        });
      }
      
      $scope.corregir = function() {
        $location.url('/carga');
      };
      
      $scope.cargarMesa = function() {
        ResultadosSrv.cargarMesa(MesasSrv.getMesa());
      }

  }]);

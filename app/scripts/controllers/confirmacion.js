'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:ConfirmacionCtrl
 * @description
 * # ConfirmacionCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('ConfirmacionCtrl', ['$location', '$scope', '$timeout', 'ListasSrv', 'MesasSrv', 'ResultadosSrv',
    function ($location, $scope, $timeout, ListasSrv, MesasSrv, ResultadosSrv) {

      $scope.resultados = [];
      $scope.mensaje = '';
      $scope.ok = true;

      var resultados = ResultadosSrv.getDatosMesa(MesasSrv.getMesa());

      if(resultados.votos.length) {
        _.each(resultados.votos, function(resultadoLista, index) {
          resultadoLista.par = ((index + 1) % 2 == 0);
          switch (resultadoLista.lista) {
            case 187: resultadoLista.nombre = 'AyL'; break;
            case 505: resultadoLista.nombre = 'FIT'; break;
            case 507: resultadoLista.nombre = '1 País'; break;
            default:
          resultadoLista.nombre = ListasSrv.getListaPorNumero(resultadoLista.lista).nombre;

          }
          $scope.resultados.push(resultadoLista);
        });
      }

      $scope.corregir = function() {
        $location.url('/carga');
      };

      $scope.cargarMesa = function() {
        ResultadosSrv.cargarMesa(MesasSrv.getMesa()).then(function(response) {
          $scope.ok = true;
          $scope.mensaje = "Los datos se cargaron correctamente";
          $timeout(function() {
            $location.url('/mesas')
          },3000);
        }, function(err) {
          $scope.ok = false;
          $scope.mensaje = "Hubo un error. Reintentar."
          $timeout(function(){
            $scope.mensaje = '';
          }, 5000);

        });
      }

  }]);

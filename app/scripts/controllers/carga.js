'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:CargaCtrl
 * @description
 * # CargaCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('CargaCtrl', ['$scope', 'ListasSrv', 'MesasSrv', 'ResultadosSrv', 
    function ($scope, ListasSrv, MesasSrv, ResultadosSrv) {

    $scope.lista = false;
    $scope.listas = false;

    ListasSrv.getListas().then(
      function(response) {
        $scope.listas = response;
        setLista();
      }
    );

    function setLista() {
      var lista = $scope.listas.shift();
      var resultados = ResultadosSrv.getDatosListaMesa(MesasSrv.getMesa(), lista.id);
    }

    $scope.agregarDatos = function (e) {

    };


  }]);

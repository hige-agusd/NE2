'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:CargaCtrl
 * @description
 * # CargaCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('CargaCtrl', ['$location', '$scope', 'ListasSrv', 'MesasSrv', 'ResultadosSrv',
    function ($location, $scope, ListasSrv, MesasSrv, ResultadosSrv) {

    $scope.partido = false;
    $scope.listas = false;
    $scope.mesa = MesasSrv.getMesa();
    $scope.votos = {};
    $scope.lista = '';
    $scope.nombre = '';

    ListasSrv.getListas().then(
      function(response) {
        $scope.listas = response;
        setLista();
      }, function(err) {
        $location.url('/login');
      });

    function setLista() {
      var lista = $scope.listas.shift();
      var resultados = ResultadosSrv.getDatosListaMesa(MesasSrv.getMesa(), lista.lista);
      $scope.partido = lista;
      $scope.lista = 'Lista ' + lista.lista;
      switch (lista.lista) {
        case 1:
        case 2: $scope.nombre = lista.nombre; break;
        case 3: $scope.nombre = 'Total'; break;
        default: $scope.nombre = ''; break;
      }
      if(resultados) {
        $scope.votos.diputados = resultados.diputados;
        $scope.votos.legisladores = resultados.legisladores;
      } else {
        $scope.votos.diputados = '';
        $scope.votos.legisladores = '';
      }
    }

    $scope.agregarDatos = function (e) {
      //agregar datos
      ResultadosSrv.setDatosListaMesa({
        mesa: MesasSrv.getMesa(),
        lista: $scope.partido.lista,
        id: $scope.partido.id,
        votos: {diputados: $scope.votos.diputados, legisladores: $scope.votos.legisladores}
      });
      if($scope.listas.length) {
        setLista();
      } else {
        $location.url('/confirmacion');
      }

    };


  }]);

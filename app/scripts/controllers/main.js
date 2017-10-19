'use strict';

/**
 * @ngdoc function
 * @name escrutinioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the escrutinioApp
 */
angular.module('escrutinioApp')
  .controller('MainCtrl', ['$scope', 'ConfigSrv', 'ListasSrv', 'ResultadosSrv', 'SessionSrv',
   function ($scope, ConfigSrv, ListasSrv, ResultadosSrv, SessionSrv) {

     $scope.listas = [];
     $scope.resultados = [];

     //SessionSrv.login({name: 'pabloTest', password: 'test'}).then(function(response){
       //ListasSrv.getListas().then(function(listas) {
         //$scope.listas = listas;
         ResultadosSrv.getResultados().then(function(resultados) {
           resultados = mostrarResultados(resultados);
           $scope.resultados = resultados;
         });
       //});
     //});

     $scope.calcColor = function(longColor) {
       var r = longColor%256,
           g = parseInt(longColor / 256) % 256,
           b = parseInt(longColor / 256 / 256) % 256,
           retVal = '#';
           retVal += (b) ? b.toString(16) : '00';
           retVal += (g) ? g.toString(16) : '00';
           retVal += (r) ? r.toString(16) : '00';
       return retVal;
     };

     function mostrarResultados(resultados) {
       angular.forEach(resultados, function(resultadoLista) {
         switch (resultadoLista.partidoNumero) {
           case 187: resultadoLista.partido = 'AyL'; break;
           case 505: resultadoLista.partido = 'FIT'; break;
           case 507: resultadoLista.partido = '1 País'; break;
         }
       });
       return resultados;
     }

  }]);

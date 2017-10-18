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

     SessionSrv.login({name: 'pabloTest', password: 'test'}).then(function(response){
       ListasSrv.getListas().then(function(listas) {
         $scope.listas = listas;
         console.log(listas)
         ResultadosSrv.getResultados().then(function(resultados) {
           $scope.resultados = resultados;
           console.log(resultados)
           mostrarResultados();
         });
       });
     });

     $scope.calcColor = function(longColor) {
       var r = longColor%256,
           g = parseInt(longColor / 256) % 256,
           b = parseInt(longColor / 256 / 256) % 256,
           retVal = '#';
           retVal += (r) ? r.toString(16) : '00';
           retVal += (g) ? g.toString(16) : '00';
           retVal += (b) ? b.toString(16) : '00';
           console.log(retVal, r,g,b, longColor)
       return retVal;
     };

     function mostrarResultados() {
       console.log($scope.listas, $scope.resultados);
     }

  }]);

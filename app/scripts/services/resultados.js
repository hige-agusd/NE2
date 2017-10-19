'use strict';

/**
 * @ngdoc service
 * @name escrutinioApp.Resultados
 * @description
 * # Resultados
 * Service in the escrutinioApp.
 */
angular.module('escrutinioApp')
  .service('ResultadosSrv', ['$http', '$q', 'ConfigSrv', 'SessionSrv', function ($http, $q, ConfigSrv, SessionSrv) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var resultados = [],
      self = {};

    self.getDatosCloned = function (haystack, needle, property) {
      var retVal = _.find( haystack, function(o) {
        return o[property] == needle;
      });
      return _.cloneDeep(retVal);
    };

    self.getDatos = function (haystack, needle, property) {
      return _.find( haystack, function(o) {
        return o[property] == needle;
      });
    };

    self.getDatosListaMesa = function(mesa, lista) {
      var resultadosMesa = self.getDatosCloned(resultados, mesa, 'mesa'),
        resultadosMesaLista,
        retVal = false;
      if(resultadosMesa) {
        resultadosMesaLista = self.getDatosCloned(resultadosMesa.votos, lista, 'lista');
        if(resultadosMesaLista) {
          retVal = _.clone(resultadosMesaLista, true);
        }
      }
      return retVal;
    };

    self.setDatosListaMesa = function(datos) {
      var resultadosMesa = self.getDatos(resultados, datos.mesa, 'mesa'),
        resultadosMesaLista;
      if(!resultadosMesa) {
        resultados.push({mesa: datos.mesa, votos:[{
          lista: datos.lista,
          id: datos.id,
          diputados: datos.votos.diputados,
          legisladores: datos.votos.legisladores
        }]});
      } else {
        resultadosMesaLista = self.getDatos(resultadosMesa.votos, datos.lista, 'lista');
        if(resultadosMesaLista) {
          resultadosMesaLista.diputados = datos.votos.diputados;
          resultadosMesaLista.legisladores = datos.votos.legisladores;
        } else {
          resultadosMesa.votos.push({
            lista: datos.lista,
            id: datos.id,
            diputados: datos.votos.diputados,
            legisladores: datos.votos.legisladores
          })
        }
      }
    };

    self.getDatosMesa = function(mesa) {
      var retVal = _.cloneDeep(self.getDatosCloned(resultados, mesa, 'mesa'));
      return retVal;
    };

    self.cargarMesa = function(mesa) {
      var deferred = $q.defer();
      console.log(resultados);
      var data = prepareToSend(mesa);
      var header = {"x-auth-token": SessionSrv.getToken()};
      $http.post(ConfigSrv.getBaseUrl() + 'fiscalApi/cargarMesas', data, {headers: header}).then(function(response) {
        deferred.resolve(response);
      }, function(err) {
        deferred.reject(err);
      });
      return deferred.promise;
    };

    function prepareToSend(mesa) {
      var retVal = [],
        votos,
        votosMesa = {};

      votosMesa.mesa = mesa;
      votosMesa.resultados = [];
      votos = self.getDatosCloned(resultados, mesa, 'mesa');
      _.each(votos.votos, function(votoLista) {
        votosMesa.resultados.push({
          partido: votoLista.id,
          diputados: votoLista.diputados,
          legisladores: votoLista.legisladores
        });
      });
      retVal.push(votosMesa);

      return retVal;
    }

    return self;
  }]);

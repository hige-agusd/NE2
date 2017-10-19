"use strict";angular.module("escrutinioApp",["ngAnimate","ngCookies","ngMessages","ngResource","ngRoute","ngSanitize","ngTouch"]).config(["$locationProvider","$routeProvider",function(e,t){t.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl",controllerAs:"login"}).when("/mesas",{templateUrl:"views/mesas.html",controller:"MesasCtrl",controllerAs:"mesasctrl"}).when("/carga",{templateUrl:"views/carga.html",controller:"CargaCtrl",controllerAs:"carga"}).when("/confirmacion",{templateUrl:"views/confirmacion.html",controller:"ConfirmacionCtrl",controllerAs:"confirmacion"}).otherwise({redirectTo:"/"}),e.hashPrefix("")}]),angular.module("escrutinioApp").controller("MainCtrl",["$scope","ConfigSrv","ListasSrv","ResultadosSrv","SessionSrv",function(e,t,o,s,r){function n(){}e.listas=[],e.resultados=[],s.getResultados().then(function(t){e.resultados=t,console.log(t),n()}),e.calcColor=function(e){var t=e%256,o=parseInt(e/256)%256,s=parseInt(e/256/256)%256,r="#";return r+=s?s.toString(16):"00",r+=o?o.toString(16):"00",r+=t?t.toString(16):"00",console.log(r,t,o,s,e),r}}]),angular.module("escrutinioApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("escrutinioApp").controller("LoginCtrl",["$location","$scope","SessionSrv",function(e,t,o){t.errMsg="",t.submit=function(){t.errMsg="",o.login(t.user).then(function(){e.url("/mesas")},function(e){t.errMsg="Usuario y/o contraseña incorrectos",console.log(e)})}}]),angular.module("escrutinioApp").service("ConfigSrv",["$http","$location",function(e,t){var o={map:{baseUrl:"http://fti.hopto.org:8081/FiscalizacionNE/"}};return o.getBaseUrl=function(){return o.map.baseUrl},o}]),angular.module("escrutinioApp").service("SessionSrv",["$http","$q","ConfigSrv",function(e,t,o){var s,r,n={};return n.login=function(r){var n={username:r.name,password:r.password},a=t.defer();return e.post(o.getBaseUrl()+"api/login",n).then(function(e){s=e.data.access_token,a.resolve(s)},function(e){a.reject(e)}),a.promise},n.getToken=function(){return s},n.getUser=function(){return r},n}]),angular.module("escrutinioApp").controller("MesasCtrl",["$location","$scope","MesasSrv",function(e,t,o){o.getMesas().then(function(e){t.mesas=e}),t.setMesa=function(t,s){o.setMesa(s),e.url("/carga")}}]),angular.module("escrutinioApp").service("MesasSrv",["$http","$q","ConfigSrv","SessionSrv",function(e,t,o,s){function r(e){var t={circuito:e[0].escuela,mesas:_.map(e,"mesa")};return console.log(t),t}var n,a,i={};return i.getMesas=function(){var a=t.defer(),i={"x-auth-token":s.getToken()};return e.get(o.getBaseUrl()+"fiscalApi/getMesas",{headers:i}).then(function(e){n=r(e.data),a.resolve(n)},function(e){a.reject(e)}),a.promise},i.setMesa=function(e){a=e},i.getMesa=function(){return a},i}]),angular.module("escrutinioApp").service("ResultadosSrv",["$http","$q","ConfigSrv","SessionSrv",function(e,t,o,s){function r(e){var t,o=[],s={};return s.mesa=e,s.resultados=[],t=i.getDatosCloned(n,e,"mesa"),_.each(t.votos,function(e){s.resultados.push({partido:e.id,diputados:e.diputados,legisladores:e.legisladores})}),o.push(s),o}var n=[],a=[],i={};return i.getDatosCloned=function(e,t,o){var s=_.find(e,function(e){return e[o]==t});return _.cloneDeep(s)},i.getDatos=function(e,t,o){return _.find(e,function(e){return e[o]==t})},i.getDatosListaMesa=function(e,t){var o,s=i.getDatosCloned(n,e,"mesa"),r=!1;return s&&(console.log(s.votos),o=i.getDatosCloned(s.votos,t,"lista"),console.log(o),o&&(r=_.clone(o,!0))),r},i.setDatosListaMesa=function(e){var t,o=i.getDatos(n,e.mesa,"mesa");o?(t=i.getDatos(o.votos,e.lista,"lista"),t?(t.diputados=e.votos.diputados,t.legisladores=e.votos.legisladores):o.votos.push({lista:e.lista,id:e.id,diputados:e.votos.diputados,legisladores:e.votos.legisladores})):n.push({mesa:e.mesa,votos:[{lista:e.lista,id:e.id,diputados:e.votos.diputados,legisladores:e.votos.legisladores}]})},i.getDatosMesa=function(e){var t=_.cloneDeep(i.getDatosCloned(n,e,"mesa"));return t},i.cargarMesa=function(a){var i=t.defer();console.log(n);var l=r(a),u={"x-auth-token":s.getToken()};return e.post(o.getBaseUrl()+"fiscalApi/cargarMesas",l,{headers:u}).then(function(e){i.resolve(e)},function(e){i.reject(e)}),i.promise},i.getResultados=function(){var r=t.defer(),n={"x-auth-token":s.getToken()};return e.get(o.getBaseUrl()+"fiscalApi/getResultados",{headers:n}).then(function(e){a=e.data,r.resolve(a)},function(e){r.reject(e)}),r.promise},i}]),angular.module("escrutinioApp").controller("CargaCtrl",["$location","$scope","ListasSrv","MesasSrv","ResultadosSrv",function(e,t,o,s,r){function n(){var e=t.listas.shift(),o=r.getDatosListaMesa(s.getMesa(),e.lista);t.partido=e,t.lista="Lista "+e.lista,t.nombre=[0,100].indexOf(e.lista)>=0?e.nombre:"",o?(t.votos.diputados=o.diputados,t.votos.legisladores=o.legisladores):(t.votos.diputados="",t.votos.legisladores="")}t.partido=!1,t.listas=!1,t.mesa=s.getMesa(),t.votos={},t.lista,t.nombre,o.getListas().then(function(e){t.listas=e,n()}),t.agregarDatos=function(o){r.setDatosListaMesa({mesa:s.getMesa(),lista:t.partido.lista,id:t.partido.id,votos:{diputados:t.votos.diputados,legisladores:t.votos.legisladores}}),t.listas.length?n():e.url("/confirmacion")}}]),angular.module("escrutinioApp").service("ListasSrv",["$http","$q","ConfigSrv","SessionSrv",function(e,t,o,s){var r,n={};return n.getListas=function(){var n=t.defer();if(r)n.resolve(_.clone(r,!0));else{var a={"x-auth-token":s.getToken()};e.get(o.getBaseUrl()+"fiscalApi/getPartidos",{headers:a}).then(function(e){r=e.data,n.resolve(_.clone(r,!0))},function(e){n.reject(e)})}return n.promise},n.getListaPorNumero=function(e){return _.find(r,function(t){return t.lista==e})},n}]),angular.module("escrutinioApp").controller("ConfirmacionCtrl",["$location","$scope","$timeout","ListasSrv","MesasSrv","ResultadosSrv",function(e,t,o,s,r,n){t.resultados=[],t.mensaje="",t.ok=!0;var a=n.getDatosMesa(r.getMesa());a.votos.length&&_.each(a.votos,function(e,o){e.par=(o+1)%2==0,e.nombre=s.getListaPorNumero(e.lista).nombre,t.resultados.push(e)}),t.corregir=function(){e.url("/carga")},t.cargarMesa=function(){n.cargarMesa(r.getMesa()).then(function(s){t.ok=!0,t.mensaje="Los datos se cargaron correctamente",o(function(){e.url("/mesas")},3e3)},function(e){t.ok=!1,t.mensaje="Hubo un error. Reintentar.",o(function(){t.mensaje=""},5e3)})}}]);
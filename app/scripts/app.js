'use strict';

/**
 * @ngdoc overview
 * @name escrutinioApp
 * @description
 * # escrutinioApp
 *
 * Main module of the application.
 */
angular
  .module('escrutinioApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(['$locationProvider', '$routeProvider',function ($locationProvider, $routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.hashPrefix('');
  }]);

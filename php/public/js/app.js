
  'use strict';

  angular.module('initApp', ['initApp.controllers'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'mainController'
    })
    .otherwise({
      redirectTo: '/'
    });
  });


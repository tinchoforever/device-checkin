
  'use strict';

  angular.module('initApp', ['initApp.services','initApp.controllers'])
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'deviceController'
    })
    .when('/main', {
      templateUrl: 'views/main.html',
      controller: 'deviceController'
    })
    .when('/select-user', {
      templateUrl: 'views/location.html',
      controller: 'deviceController'
    })
    .when('/select-location', {
      templateUrl: 'views/select-location.html',
      controller: 'locationController'
    })
     .when('/select-user', {
      templateUrl: 'views/select-user.html',
      controller: 'usersController'
    })
      .when('/finish', {
      templateUrl: 'views/finish.html',
      controller: 'checkinController'
    })
    .otherwise({
      redirectTo: '/'
    });
  });


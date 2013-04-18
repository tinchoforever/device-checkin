(function () {
  'use strict';

  initApp
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'deviceController'
    })
    .when('/location', {
      templateUrl: 'views/location.html',
      controller: 'deviceController'
    })
    .when('/picture', {
      templateUrl: 'views/picture.html',
      controller: 'deviceController'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
})();


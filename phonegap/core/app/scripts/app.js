(function () {
  'use strict';

  initApp
  .config(function ($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'deviceController'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
})();


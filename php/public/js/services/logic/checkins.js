

'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('initApp.services', ['LocalStorageModule', 'ngResource'])
.value('version', '0.1')
.service('checkins', function ($rootScope, $http, localStorageService, $resource) {
  return {
    getall:function (successCallback)
    {
      $http.get("http://localhost:1984/api/v1/devices/checkin/all").success(successCallback);
   }
 };
});


'use strict';

/* Services */


angular.module('initApp.services')
.value('version', '0.1')
.service('users', function ($rootScope, $http, localStorageService, $resource) {
  return {
    getall:function (successCallback)
    {
      $http.get("http://192.168.1.69:1984/api/v1/users/all/").success(successCallback);
   }

 };
});


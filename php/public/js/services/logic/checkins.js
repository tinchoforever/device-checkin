'use strict';

/* Services */


angular.module('initApp.services')
.service('checkins', function ($rootScope, $http, localStorageService, $resource) {
  return {
    getlast:function (successCallback)
    {
      $http.get("http://10.230.34.132:1984/api/v1/users/all/").success(successCallback);
   }

 };
});


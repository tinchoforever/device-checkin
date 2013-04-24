'use strict';

/* Services */

angular.module('initApp.services')
.value('version', '0.1')
.service('users', function ($rootScope, $http, localStorageService, $resource) {
  return {
    getall:function (successCallback)
    {
      $http.get(getAPIUrl('/users/all/')).success(successCallback);
   }

 };
});


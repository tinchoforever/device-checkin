'use strict';

/* Services */

angular.module('initApp.services')
  .service('locations', function ($rootScope, $http, localStorageService, $resource) {
  return {
     getall:function (successCallback)
    {
        $http.get("http://192.168.1.69:1984/api/v1/locations/all/").success(successCallback);
  }
};
});


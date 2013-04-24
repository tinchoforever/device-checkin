'use strict';

/* Services */

angular.module('initApp.services')
  .service('locations', function ($rootScope, $http, localStorageService, $resource) {
  return {
     getall:function (successCallback)
    {
        $http.get("http://10.230.34.132:1984/api/v1/locations/all/").success(successCallback);
  }
};
});


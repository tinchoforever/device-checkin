'use strict';

/* Services */

angular.module('initApp.services')
  .service('locations', function ($rootScope, $http, localStorageService, $resource) {
  return {
     getall:function (successCallback)
    {
    	$http.get(getAPIUrl('/locations/all/')).success(successCallback);
  	}
};
});


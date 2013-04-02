'use strict';
var initApp = angular.module('initApp', []);

initApp.controller('deviceController', function ($scope, geolocation, camera) {
  geolocation.getCurrentPosition(function (position) {
    $scope.position = position;
});
  $scope.refreshLocation = function() {
     geolocation.getCurrentPosition(function (position) {
      $scope.position = position;
    });
  };
  $scope.takepic = function() {
      camera.getPicture(function (image) {
        console.log(image);
       $scope.photo = image;
    });

    }
});

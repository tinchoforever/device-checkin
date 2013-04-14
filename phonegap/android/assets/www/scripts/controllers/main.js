'use strict';
var initApp = angular.module('initApp', []);

initApp.controller('deviceController', function ($scope, geolocation, camera, device ) {

  $scope.refreshLocation = function() {
       console.log("refreshLocation");
   geolocation.getCurrentPosition(function (position) {
    console.log(position);
    $scope.position = position;
  });
 };
 $scope.takepic = function() {
  camera.getPicture(function (image) {
    $scope.photo = image;
  });

};
$scope.refreshDevice = function() {
  $scope.device = device.getInfo();
};

geolocation.getCurrentPosition(function (position) {
  $scope.position = position;
});
$scope.device = device.getInfo();
});

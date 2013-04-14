'use strict';
var initApp = angular.module('initApp', []);

initApp.controller('deviceController', function ($scope, geolocation, camera, device ) {

  $scope.refreshLocation = function() {
   geolocation.getCurrentPosition(function (position) {
    alert(postion);
    $scope.position = position;
    console.log(position);
  });
 };
 $scope.takepic = function() {
  camera.getPicture(function (image) {
    $scope.photo = image;
    $scope.aaa = "aaa";
    alert(image);
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

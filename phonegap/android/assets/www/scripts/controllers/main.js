'use strict';
var initApp = angular.module('initApp', []);

initApp.controller('deviceController', function ($scope, geolocation, camera, device ) {
  geolocation.getCurrentPosition(function (position) {
    $scope.position = position;
  });
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

  });

};
$scope.refreshDevice = function() {
  $scope.device = device.getInfo();
};
$scope.device = device.getInfo();
$scope.photo = "http://www.infobae.com/adjuntos/jpg/2013/04/653089.jpg";

});

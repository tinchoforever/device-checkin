'use strict';
var initApp = angular.module('initApp',  ['LocalStorageModule']);

initApp.controller('deviceController', function ($scope, geolocation, camera, device, localStorageService,checkins) {

  $scope.refreshLocation = function() {
   geolocation.getCurrentPosition(function (position) {
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

$scope.submitCheckin = function() {
  checkins.submit($scope.photo, $scope.position,$scope.device);
};


geolocation.getCurrentPosition(function (position) {
  $scope.position = position;
});
$scope.device = device.getInfo();

$scope.lastCheckin = checkins.load();
console.log($scope.lastCheckin);

});

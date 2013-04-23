'use strict';
var initApp = angular.module('initApp.controllers',  ['LocalStorageModule']);

initApp.controller('deviceController', function ($scope, geolocation, camera, device, localStorageService,checkins) {

  $scope.refreshLocation = function() {
   geolocation.getCurrentPosition(function (position) {
     $scope.position = position;
     $scope.map = "http://maps.google.com/maps/api/staticmap?sensor=false&center=" + position.coords.latitude + "," +
                    position.coords.longitude + "&zoom=20&size=300x200&markers=color:blue|label:S|" +
                    position.coords.latitude + ',' + position.coords.longitude;
   });
 };

 $scope.takepic = function() {
  camera.getPicture(function (image) {
    $scope.photo = image;
  });

};

$scope.refreshDevice = function() {
  device.getInfo(function (deviceinfo) {
    $scope.deviceinfo = deviceinfo;
    checkins.setDevice(deviceinfo)
  });
};

$scope.submitCheckin = function() {
  checkins.submit($scope.photo, $scope.position,$scope.deviceinfo);
};



$scope.refreshLocation();
$scope.refreshDevice();


$scope.lastCheckin = checkins.load();
 if ($scope.lastCheckin){

  $scope.lastuse = $scope.lastCheckin.time ?  $scope.lastCheckin.time :1318781876406 ;
  $scope.lastuse = moment($scope.lastuse).fromNow();
}



});

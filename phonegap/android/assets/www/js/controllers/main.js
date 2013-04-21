'use strict';
var initApp = angular.module('initApp',  ['LocalStorageModule']);

initApp.controller('deviceController', function ($scope, $http, geolocation, camera, device, localStorageService,checkins) {

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
  });

};

$scope.submitCheckin = function() {
  checkins.submit($scope.photo, $scope.position,$scope.deviceinfo);
};



$scope.refreshLocation();
$scope.refreshDevice();


// var lastCheckin = checkins.load();
// if (lastCheckin){
//   $scope.lastuse = lastCheckin.time ? lastCheckin.time :1318781876406 ;
//   $scope.lastuse = moment($scope.lastuse).fromNow();
// }

// $scope.lastCheckin = lastCheckin;
// console.log($scope.lastCheckin);
// if ($scope.lastCheckin.photo){
//     //Todo add to photo logic
//   $scope.photo = "data:image/png;base64," + $scope.lastCheckin.photo;

// }



});

'use strict';
var initApp = angular.module('initApp',  ['LocalStorageModule']);

initApp.controller('deviceController', function ($scope, $http, geolocation, camera, device, localStorageService,checkins) {

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

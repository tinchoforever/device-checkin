'use strict';
var initApp = angular.module('initApp.controllers');

initApp.controller('checkinController', function ($scope,  $location , checkins) {

  $scope.next = checkins.getNext();

  $scope.submit = function (){
    $scope.waiting = true;
     checkins.submit(function(){
          console.log($location.path());
          $location.path('/');
         console.log($location.path());
    });
  }
});

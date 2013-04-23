'use strict';
var initApp = angular.module('initApp.controllers');

initApp.controller('checkinController', function ($scope, checkins) {

  $scope.next = checkins.getNext();

  $scope.submit = function (){
    $scope.waiting = true;
     checkins.submit(function(){
      window.location ="/#";
    });
  }
});

'use strict';
var initApp = angular.module('initApp.controllers');

initApp.controller('usersController', function ($scope, users,checkins) {

  users.getall(function(users){
    $scope.users = users;
  });
  $scope.select = function(user){
    if ($scope.selected == user)
    {
        $scope.selected = undefined;
    }
    else
    {
        $scope.selected = user;
        checkins.setTo(user);
    }
  };
});

'use strict';
var initApp = angular.module('initApp.controllers',  ['LocalStorageModule']);

initApp.controller('mainController', function ($scope, localStorageService,checkins ) {



 checkins.getall(function(checkins){
    $scope.checkins = checkins;
  });

});

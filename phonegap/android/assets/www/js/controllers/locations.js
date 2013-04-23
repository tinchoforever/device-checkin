'use strict';
var initApp = angular.module('initApp.controllers');

initApp.controller('locationController', function ($scope, locations,checkins) {

  locations.getall(function(locations){
    $scope.locations = locations;
});
  $scope.select = function(item){
    if ($scope.selected == item)
    {
        $scope.selected = undefined;
    }
    else
    {
        $scope.selected = item;
        checkins.setLocation(item);
    }
};

});

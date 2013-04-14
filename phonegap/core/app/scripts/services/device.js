initApp.factory('device', function ($rootScope, cordovaReady) {

  return {
    getInfo: cordovaReady(function (onSuccess, onError) {
      return device;

  })
};

});


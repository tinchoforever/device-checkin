initApp.factory('device', function ($rootScope, cordovaReady) {

  return {
    getInfo: cordovaReady(function (onSuccess, onError) {
      console.log(device);
      return device;

  })
};

});


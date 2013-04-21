initApp.factory('device', function ($rootScope,  cordovaReady) {

  return {
    getInfo: cordovaReady(function (onSuccess, onError) {
        onSuccess(device);
    })
}
});


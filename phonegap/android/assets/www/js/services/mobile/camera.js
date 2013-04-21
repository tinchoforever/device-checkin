initApp.factory('camera', function ($rootScope, cordovaReady) {
  return {
    getPicture: cordovaReady(function (onSuccess, onError) {
        navigator.camera.getPicture(function (imageURI) {
        var that = this,
          args = arguments;

        if (onSuccess) {
          $rootScope.$apply(function () {
            onSuccess.apply(that, args);
          });
        }
      }, function () {
        var that = this,
          args = arguments;

        if (onError) {
          $rootScope.$apply(function () {
            onError.apply(that, args);
          });
        }
      });
    })
  };
});


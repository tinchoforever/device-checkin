initApp.factory('checkins', function ($rootScope,localStorageService) {
  return {
    submit:function (photo,location,device) {
      checkin = {
        photo: photo,
        location : location,
        device: device
      };
      localStorageService.add('currentCheckin', checkin);
    },
    load:function () {
      return localStorageService.get('currentCheckin');
    }

  };
});


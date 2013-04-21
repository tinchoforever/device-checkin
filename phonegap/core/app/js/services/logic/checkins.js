'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('initApp.services', [])
  .value('version', '0.1')
  .service('myService', function(dep1, dep2) {
    //instantiate "this" just as a constructor would
  })
  .service('checkins', function ($rootScope, $http, localStorageService) {
  return {
    submit:function (photo,location,device) {

    //   img = document.createElement("img");
    //   img.src = photo;
    // // Create an empty canvas element
    // var canvas = document.createElement("canvas");
    // canvas.width = img.width;
    // canvas.height = img.height;
    // // Copy the image contents to the canvas
    // var ctx = canvas.getContext("2d");
    // ctx.drawImage(img, 0, 0);
    // // Get the data-URL formatted image
    // // Firefox supports PNG and JPEG. You could check img.src to
    // // guess the original format, but be aware the using "image/jpg"
    // // will re-encode the image.
    // var dataURL = canvas.toDataURL("image/png");
    // photo = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    // console.log(photo);
    checkin = {
      photo: photo,
      location : location,
      device: device,
      time: (new Date()).getTime()
    };
    localStorageService.add('currentCheckin', checkin);

    data = {device : {
      'uid' : device.uuid,
      "version" :   device.version,
      "name" :   device.name,
      "platform": device.platform,
      "model" :  device.model  ?  device.model  : ''
    }};

    $http.post('http://192.168.1.102:1984/api/v1/devices/create', data)
    .success(function(data, status, headers, config) {
      console.log("success");
    }).
    error(function(data, status, headers, config) {
     console.log("error");
   });
  },
  load:function () {
    return localStorageService.get('currentCheckin');
  }

};
});


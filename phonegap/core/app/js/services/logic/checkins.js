initApp.factory('checkins', function ($rootScope,localStorageService) {
  return {
    submit:function (photo,location,device) {

    img = document.createElement("img");
    img.src = photo;
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

     photo = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
     console.log(photo);
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


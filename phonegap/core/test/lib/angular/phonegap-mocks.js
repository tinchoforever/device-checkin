var navigator = window.navigator || {};

navigator.camera =  (function() {
  function resizeImage(img, maxHeight, maxWidth) {
    var ratio = maxHeight/maxWidth;
    if (img.height/img.width > ratio){
         // height is the problem
        if (img.height > maxHeight){
          img.width = Math.round(img.width*(maxHeight/img.height));
          img.height = maxHeight;
        }
    } else {
       // width is the problem
       if (img.width > maxHeight){
          img.height = Math.round(img.height*(maxWidth/img.width));
          img.width = maxWidth;
        }
    }
  }

  // Always succeeds. Returns data URL for a local static photo
  function getPicture(onSuccess, onFail, options) {
    // We're just going to always succeed.
    var img = document.createElement('img');
    img.src = '/img/mockmeal.jpg';
    img.style.position = 'absolute';
    img.style.left     = '-999em';

    img.onload = function() {
      if (options.targetHeight && options.targetWidth) {
        resizeImage(img, options.targetHeight, options.targetWidth);
      }
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);

      var dataURL = canvas.toDataURL("image/jpeg");
      onSuccess(dataURL.replace('data:image/jpeg;base64,', ''));
    };
    document.body.appendChild(img);
  }

  return {
    getPicture: getPicture
  };
})();
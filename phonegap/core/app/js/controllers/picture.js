
img = document.createElement("img");
img.src = photo;
 // Create an empty canvas element
var canvas = document.createElement("canvas");
canvas.width = img.width;
canvas.height = img.height;
// Copy the image contents to the canvas
var ctx = canvas.getContext("2d");
ctx.drawImage(img, 0, 0);
var dataURL = canvas.toDataURL("image/png");
photo = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
console.log(photo);
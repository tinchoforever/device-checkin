var client = new Faye.Client('http://seed.web.rga.com:3000/sockets');
var subscription = client.subscribe('/data', function(PostObject) {
    console.log(PostObject);
});
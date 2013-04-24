'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('initApp.services', ['LocalStorageModule', 'ngResource'])
.value('version', '0.1')
.service('checkins', function ($rootScope, $http, localStorageService, $resource,device) {
  return {
    next: {},
    device: {},
    setTo: function (user) {
      this.next.to = user;
      $rootScope.$broadcast( 'checkins.update', this.next );
    },
    setLocation: function (location) {
      this.next.location = location;
      $rootScope.$broadcast( 'checkins.update', this.next );
    },
    setDevice: function (device) {
      this.device = device;
    },
    getCurrent:function (){
      return localStorageService.get('current');
    },
    getNext:function (callback){
      return this.next;
    },
    submit:function (callback){
      //Set date to new chekcin
      this.next.time= (new Date()).getTime();
      //Save it to log
      this.addToHistory(this.next);
      //Add device info
      this.next.device = this.device;
      //Store at local
      localStorageService.add('current', this.next);
      //Submit to server OF COURSE!!
      var service ="http://10.230.34.132:1984/api/v1/devices/checkin";
      $http.post(service, this.next ).success(function(data) {
         callback();
      });


    },
    addToHistory: function (next) {
      var log = localStorageService.get('history');
      if (!log)
      {
        log = [];
      }
      log.push(next);
      localStorageService.add('history',log );

    },
    create:function() {

      data = {device : {
        'uid' : device.uuid,
        "version" :   device.version,
        "name" :   device.name,
        "platform": device.platform,
        "model" :  device.model  ?  device.model  : ''
      }};

      $http.post('http://192.168.1.69:1984/api/v1/devices/create', data)
      .success(function(data, status, headers, config) {
        console.log("success");
      }).
      error(function(data, status, headers, config) {
       console.log("error");
     });
    },
    load:function () {
      return localStorageService.get('current');
    }

  };
});


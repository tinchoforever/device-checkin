'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('initApp.services'));
  describe('version', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
  }));
});

  describe('checkins', function() {
    var service, $httpBackend;
    beforeEach(inject(function(checkins,_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      service = checkins;
  }));
    it('should submit',inject(function() {
    $httpBackend.whenPOST('/test').respond("a");
     var checkin = {};
    var result = service.submit(checkin, function (result) {


     });
      expect(result).toBe("z");
            $httpBackend.flush();
            console.log(result);
            alert();



 }));
});
});

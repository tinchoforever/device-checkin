
    WhoHasItConfig = {
      hostname: "whohasitservice.no-ip.org",
      apiPort: 1984
    };
    function getAPIUrl(serviceEndPoint){
      var baseUrl = "http://" + WhoHasItConfig.hostname + (WhoHasItConfig.apiPort != 80 ? (":" + WhoHasItConfig.apiPort) : '')  +  "/api/v1";
      return baseUrl +  serviceEndPoint;
    }

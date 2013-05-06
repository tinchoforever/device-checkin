<!DOCTYPE html>
<html xmlns:ng="http://angularjs.org">
<head>
  <!--[if lte IE 8]>
  <script>
    document.createElement('ng-include');
    document.createElement('ng-pluralize');
    document.createElement('ng-view');
    document.createElement('ng:include');
    document.createElement('ng:pluralize');
    document.createElement('ng:view');
  </script>
  <![endif]-->

  <meta http-equiv="content-type" content="text/html; charset=UTF-8">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title></title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width">
  <script src="js/frameworks/zepto.min.js"></script>
  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
  <link rel="stylesheet" href="css/frameworks/gumby.css">
  <link rel="stylesheet" href="css/base.css">



</head>
<body ng-app="initApp">
  <div class="pretty navbar" gumby-fixed="top" id="nav3">
    <div class="row">
      <a class="toggle" gumby-trigger="#nav3 &gt; .row &gt; ul" href="#"><i class="icon-menu"></i></a>
      <h1 class="four columns logo">
        <a href="#">
          <h3> Who has it?</h3>
        </a>
      </h1>
      <ul class="eight columns">
      </ul>
    </div>
  </div>
  <!-- Add your site or application content here -->
  <div class="container">
    @yield('content')
  </div>


  <!-- build:js scripts/scripts.js -->

  <script src="js/frameworks/angular.min.js"></script>
  <script src="js/frameworks/angular-resource.js"></script>
  <script src="js/libs/moment.min.js"></script>

  <script src="js/controllers/main.js"></script>
  <script src="js/services/libs/localStorage.js"></script>
  <script src="js/services/logic/checkins.js"></script>

  <script src="js/app.js"></script>


  <!-- endbuild -->
</body>
</html>

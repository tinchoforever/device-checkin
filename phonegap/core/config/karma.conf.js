basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'app/js/frameworks/angular.min.js',

  'test/lib/angular/angular-mocks.js',
   'app/js/app.js',
  'app/js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
